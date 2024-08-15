import { useState } from "react";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";
import styles from "../Promotions.module.css";
import { useGetAllEventsQuery } from "../../../../../state/redux/events/eventsApi";

const Form = ({ onSubmit, defaultValue, onChange }) => {
  const { data: { events } = {} } = useGetAllEventsQuery();
  const [promotion, setPromotion] = useState({
    name: "",
    description: "",
    termsAndConditions: "",
    promoCode: "",
    type: "general",
    pattern: [],
    expiry: "",
    maxDiscountInINR: "",
    discountType: "percentage",
    discountValue: "",
    applicableOn: [],
    currentUsage: 0,
    maxUsage: 0,
    isActive: "",
    ...(defaultValue || {}),
  });
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    if (name === "pattern") handlePatternChange(value);
    else if (name == "applicableOn") handleApplicableOnChange(value);
    else setPromotion({ ...promotion, [name]: value });

    if (onChange) onChange({ ...promotion, [name]: value });
  };

  const handleApplicableOnChange = (value) => {
    const [type, identity] = value.split(":");
    const filtered =
      promotion.applicableOn?.filter((v) => !v.startsWith(`${type}:`)) || [];
    setPromotion({
      ...promotion,
      applicableOn: identity ? [...filtered, value] : filtered,
    });
  };

  const handlePatternChange = (value) => {
    const updatedPattern = [...new Set(value)];
    setPromotion({ ...promotion, pattern: updatedPattern });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(promotion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid columns={12}>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Name"
            validations={{ required: true, maxLength: 100 }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("name", value)}
            defaultValue={promotion.name}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Description"
            validations={{ required: true, maxLength: 500 }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("description", value)}
            defaultValue={promotion.description}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Terms and Conditions"
            validations={{ required: true, maxLength: 1000 }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("termsAndConditions", value)}
            defaultValue={promotion.termsAndConditions}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Promo Code"
            validations={{ required: true, pattern: /^[a-zA-Z0-9]+$/g }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("promoCode", value)}
            defaultValue={promotion.promoCode}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Dropdown
            label="Type"
            entries={["general", "targeted"]}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("type", value)}
            defaultValue={promotion.type || "general"}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Email addresses"
            placeholder="comma-separated list of email addresses"
            onValidation={handleCanSubmit}
            defaultValue={promotion.pattern
              ?.filter((pattern) => /^email:.*/g.test(pattern))
              .map((email) => email?.split(":")[1])
              .filter(Boolean)
              .join(",")}
            onChange={(value) =>
              handleChange(
                "pattern",
                value.split(",").map((email) => `email:${email.trim()}`)
              )
            }
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Domains"
            placeholder="iitism.ac.in, festify.com"
            onValidation={handleCanSubmit}
            defaultValue={promotion.pattern
              ?.filter((pattern) => /^domain:.*/g.test(pattern))
              .map((domain) => domain?.split(":")[1])
              .filter(Boolean)
              .join(",")}
            onChange={(value) =>
              handleChange(
                "pattern",
                value.split(",").map((domain) => `domain:${domain.trim()}`)
              )
            }
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Dropdown
            label="Applicable on events"
            onValidation={handleCanSubmit}
            entries={[
              "No events",
              "All events",
              ...(events?.map((evt) => evt.name) || []),
            ]}
            defaultValue={getApplicableOnEventsDefaultValue()}
            onChange={(value) => {
              if (value === "No events")
                return handleChange("applicableOn", "event:");

              if (value === "All events")
                return handleChange("applicableOn", "event:*");

              handleChange(
                "applicableOn",
                `event:${events?.find((evt) => evt.name === value)?._id}`
              );
            }}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.DateTime
            label="Expiry Date"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("expiry", value)}
            defaultValue={promotion.expiry}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Max Discount (INR)"
            type="number"
            validations={{ required: true, min: 1 }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("maxDiscountInINR", value)}
            defaultValue={promotion.maxDiscountInINR}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Dropdown
            label="Discount Type"
            entries={["percentage", "fixed"]}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("discountType", value)}
            defaultValue={promotion.discountType || "percentage"}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Discount Value"
            type="number"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("discountValue", value)}
            defaultValue={promotion.discountValue}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Max usage"
            help="max usage of 0 means unlimited usage (1 per user)"
            type="number"
            validations={{ required: true, min: 0 }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("maxUsage", value)}
            defaultValue={promotion.maxUsage}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Radio
            label="Is active?"
            entries={["Yes", "No"]}
            validations={{ required: true }}
            onChange={(value) =>
              handleChange("isActive", value === "Yes" ? true : false)
            }
            defaultValue={promotion.isActive ? "Yes" : "No"}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </GridItem>
      </Grid>
    </form>
  );

  function getApplicableOnEventsDefaultValue() {
    const filtered = promotion.applicableOn
      ?.find((applicableOn) => /^event:.*/g.test(applicableOn))
      ?.split(":")[1];

    if (!filtered) return "No events";
    else if (filtered === "*") return "All events";
    else return events?.find((evt) => evt._id === filtered)?.name;
  }
};

export default Form;
