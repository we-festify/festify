import React, { useEffect, useState } from "react";
import styles from "./ListInput.module.css";
import { MdDeleteForever } from "react-icons/md";

const ListInput = ({
  children,
  label,
  validations,
  onChange,
  onValidation,
  defaultValue,
}) => {
  if (!Array.isArray(children)) children = [children];

  const [error, setError] = useState("");
  const [list, setList] = useState([]);
  const [listOfValues, setListOfValues] = useState([]);

  useEffect(() => {
    if (defaultValue) {
      setList(defaultValue.map((item) => children));
      setListOfValues(defaultValue);
    } else {
      setList([children]);
      setListOfValues([
        {
          ...children.reduce(
            (acc, child) => ({ ...acc, [child.props.name]: "" }),
            {}
          ),
        },
      ]);
    }
  }, []);

  const validate = () => {
    let isValid = true;
    if (validations?.required && list.length === 0) {
      setError(`${label} is required`);
      isValid = false;
    } else if (validations?.minLength && list.length < validations.minLength) {
      setError(`${label} must be at least ${validations.minLength} items`);
      isValid = false;
    } else if (validations?.maxLength && list.length > validations.maxLength) {
      setError(`${label} must be at most ${validations.maxLength} items`);
      isValid = false;
    }
    if (onValidation) onValidation(isValid);
    if (isValid) setError("");
    return isValid;
  };

  const handleItemAdd = (e) => {
    e.preventDefault();
    setList((list) => {
      const newList = [...list, children];
      return newList;
    });
    setListOfValues((listOfValues) => {
      const names = children.map((child) => child.props.name);
      const newListOfValues = [
        ...listOfValues,
        {
          ...names.reduce((acc, name) => ({ ...acc, [name]: "" }), {}),
        },
      ];
      return newListOfValues;
    });
  };

  const handleItemRemove = (e, index) => {
    e.preventDefault();
    setList((list) => {
      const newList = [...list];
      newList.splice(index, 1);
      return newList;
    });
    setListOfValues((listOfValues) => {
      const newListOfValues = [...listOfValues];
      newListOfValues.splice(index, 1);
      return newListOfValues;
    });
  };

  useEffect(() => {
    validate();
    if (onChange) onChange(listOfValues);
  }, [listOfValues]);

  return (
    <div className={styles.container}>
      <h5 className={styles.label}>{label}</h5>
      <div className={styles.list} onBlur={validate}>
        {list.map((item, index) => (
          <div className={styles.item} key={index}>
            {Array.from(item).map((child, innerIndex) =>
              React.cloneElement(child, {
                key: innerIndex,
                ...child.props,
                defaultValue: listOfValues[index][child.props.name],
                onChange: (value) => {
                  const newList = [...list];
                  newList[index] = Array.from(item).map((child, innerIndex) =>
                    React.cloneElement(child, {
                      key: innerIndex,
                      ...child.props,
                      value: value[child.props.name],
                    })
                  );
                  setList(newList);
                  const newListOfValues = [...listOfValues];
                  newListOfValues[index] = {
                    ...listOfValues[index],
                    [child.props.name]: value,
                  };
                  setListOfValues(newListOfValues);
                  if (onChange) onChange(newListOfValues);
                },
                onValidation: (isValid) => {
                  if (onValidation) onValidation(isValid);
                },
              })
            )}
            <button
              className={styles.remove}
              onClick={(e) => handleItemRemove(e, index)}
            >
              <MdDeleteForever />
              <span>Remove</span>
            </button>
          </div>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.add} onClick={handleItemAdd}>
        Add {label} Item
      </button>
    </div>
  );
};

export default ListInput;
