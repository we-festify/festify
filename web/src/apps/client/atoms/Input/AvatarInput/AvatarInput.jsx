import { useState } from "react";
import styles from "./AvatarInput.module.css";
import Avatar from "../../../components/Avatar/Avatar";
import { MdEdit } from "react-icons/md";
import useModal from "../../../../../hooks/useModal/useModal";
import AvatarInputModalContent from "./AvatarInputModalContent";

const AvatarInput = ({
  onChange,
  defaultValue = {
    name: "Avatar",
  },
}) => {
  const [AvatarInputModal, { open }] = useModal(AvatarInputModalContent);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (value) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.group}>
      <AvatarInputModal onChange={handleChange} />
      <div className={styles.avatarInput} onClick={() => open()}>
        <Avatar {...value} size={100} />
        <span className={styles.edit}>
          <MdEdit size={16} />
        </span>
      </div>
    </div>
  );
};

export default AvatarInput;
