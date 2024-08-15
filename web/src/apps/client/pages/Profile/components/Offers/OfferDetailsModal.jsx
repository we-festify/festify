import { useGetPromotionByIdQuery } from "../../../../../../state/redux/promotions/promotionsApi";
import { formatDateTime } from "../../../../../../utils/time";
import Modal from "../../../../components/Modal/Modal";

const OfferDetailsModal = ({ close, promotionId = {} }) => {
  const { data: { promotion } = {}, isLoading } =
    useGetPromotionByIdQuery(promotionId);

  if (isLoading) return <Modal title="Loading..." close={close} />;

  return (
    <Modal title={promotion.name} close={close}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Promo Code</p>
            <p>{promotion.promoCode}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Discount</p>
            <p>
              {promotion.discountValue}
              {promotion.discountType === "percentage" ? "%" : "₹"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Expiry</p>
            <p>{formatDateTime(promotion.expiry)}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Description</p>
          <p>{promotion.description}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Terms & Conditions</p>
          <p>{promotion.termsAndConditions}</p>
        </div>
      </div>
    </Modal>
  );
};

export default OfferDetailsModal;
