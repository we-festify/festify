import { FaCheckCircle } from "react-icons/fa";
import Button from "../../atoms/Button";
import styles from "./ApplyPromoCode.module.css";
import { useState } from "react";
import { cn } from "../../../../utils/tailwind";

const ApplyPromoCode = ({ onChange, defaultValue }) => {
  const [promoCode, setPromoCode] = useState(defaultValue);
  const [isApplied, setIsApplied] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setPromoCode(e.target.value);

    if (onChange instanceof Function) {
      onChange(e.target.value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsApplied((p) => !p);
  };

  return (
    <div className="space-y-2">
      {!isApplied && (
        <div className={styles.formGroup}>
          <label htmlFor="promoCode">Promo Code</label>
          <div className="relative">
            <input
              type="text"
              name="promoCode"
              id="promoCode"
              className={styles.input}
              defaultValue={defaultValue}
              onChange={handleChange}
            />
            {promoCode && (
              <div
                className="text-secondary absolute top-2 right-4"
                role="button"
              >
                Apply
              </div>
            )}
          </div>
        </div>
      )}
      <p className="text-xs font-medium">Best Offer</p>
      <PromoCard isApplied={isApplied} handleClick={handleClick} />
    </div>
  );
};

export default ApplyPromoCode;
function PromoCard({ isApplied, handleClick }) {
  return (
    <div
      className={cn(
        "flex w-full gap-4 items-center py-2 px-4 bg-white/10 rounded-md transition-all",
        isApplied && "ring-1 ring-green-500 bg-green-500/20"
      )}
    >
      <div className={cn("text-lg", isApplied && "text-green-500")}>
        <FaCheckCircle />
      </div>
      <div className="flex-1 text-sm">
        <p>EDMFORISM{isApplied ? " applied" : ""}</p>
        <p className="text-xs">20% discount</p>
      </div>
      <div>
        <span className="text-secondary cursor-pointer" onClick={handleClick}>
          {isApplied ? "Remove" : "Apply"}
        </span>
      </div>
    </div>
  );
}
