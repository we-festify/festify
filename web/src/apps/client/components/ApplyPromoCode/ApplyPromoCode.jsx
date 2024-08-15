import { FaCheckCircle } from "react-icons/fa";
import styles from "./ApplyPromoCode.module.css";
import { useEffect, useState } from "react";
import { cn } from "../../../../utils/tailwind";
import {
  useGetBestApplicablePromotionQuery,
  useGetPromotionByPromoCodeQuery,
} from "../../../../state/redux/promotions/promotionsApi";

const ApplyPromoCode = ({
  onChange,
  defaultValue,
  orderType,
  orderAmount,
  onApply,
}) => {
  const { data: { promotion: bestPromotion } = {} } =
    useGetBestApplicablePromotionQuery({
      orderType,
      orderAmount,
    });
  const [promoCode, setPromoCode] = useState(defaultValue);
  const { data: { promotion } = {} } = useGetPromotionByPromoCodeQuery(
    promoCode,
    {
      skip: !promoCode,
    }
  );
  const [appliedPromotion, setAppliedPromotion] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(orderAmount);

  useEffect(() => {
    if (promotion && promotion.isActive) {
      setAppliedPromotion(promotion);
    } else {
      setAppliedPromotion(null);
    }
  }, [promotion]);

  useEffect(() => {
    handleApplyPromoCode(appliedPromotion);
    if (onApply instanceof Function) {
      onApply(appliedPromotion);
    }
  }, [appliedPromotion]);

  const handleApplyPromoCode = (promotion) => {
    if (promotion) {
      if (promotion.discountType === "percentage") {
        const discountValue = Math.min(
          (promotion.discountValue * orderAmount) / 100,
          orderAmount
        );
        setDiscount(discountValue);
        setTotalAmount(orderAmount - discountValue);
      } else {
        const discountValue = Math.min(
          promotion.discountValue,
          orderAmount,
          promotion.maxDiscountInINR
        );
        setDiscount(discountValue);
        setTotalAmount(orderAmount - discountValue);
      }
    } else {
      setDiscount(0);
      setTotalAmount(orderAmount);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPromoCode(e.target.value);

    if (onChange instanceof Function) {
      onChange(e.target.value);
    }
  };

  const handleClickPromo = (e) => {
    e.preventDefault();
    if (promoCode) {
      setPromoCode(null);
      setTimeout(() => {
        setPromoCode(promoCode);
      }, 0);
    }
  };

  const handleClickBestPromo = (e) => {
    e.preventDefault();
    if (appliedPromotion) {
      setAppliedPromotion(null);
    } else {
      setAppliedPromotion(bestPromotion);

      if (onChange instanceof Function) {
        onChange(bestPromotion.promoCode);
      }
    }
  };

  return (
    <div className="space-y-2">
      {!appliedPromotion && (
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
                onClick={handleClickPromo}
              >
                Apply
              </div>
            )}
          </div>
        </div>
      )}
      <p className="text-xs font-medium">Best Offer</p>
      <PromoCard
        promotion={bestPromotion}
        isApplied={appliedPromotion ? true : false}
        handleClick={handleClickBestPromo}
      />
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex justify-between gap-4">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p className="text-right">₹ {orderAmount}</p>
        </div>
        <div className="flex justify-between gap-4">
          <p className="text-muted-foreground">Discount</p>
          <p
            className={cn(
              "text-sm text-right",
              discount > 0 && "text-green-500"
            )}
          >
            ₹ {discount}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 border-t-2 border-t-muted pt-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl text-right text-secondary">
            {totalAmount > 0 ? `₹ ${totalAmount}` : "Free"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyPromoCode;

const PromoCard = ({ isApplied, handleClick, promotion }) => {
  if (!promotion) {
    return (
      <div className="text-sm text-muted-foreground">No offers available</div>
    );
  }

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
        <p>
          {promotion.name}
          {isApplied ? " applied" : ""}
        </p>
        <p className="text-xs">
          {promotion.discountType === "fixed" && "₹"}
          {promotion.discountValue}
          {promotion.discountType === "percentage" && "%"} discount
        </p>
      </div>
      <div>
        <span className="text-secondary cursor-pointer" onClick={handleClick}>
          {isApplied ? "Remove" : "Apply"}
        </span>
      </div>
    </div>
  );
};
