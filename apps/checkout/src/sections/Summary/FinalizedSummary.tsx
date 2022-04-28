import { Text } from "@/components/Text";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { SummaryItem } from "./SummaryItem";
import { OrderLine } from "@/graphql";
import { Divider } from "@/components/Divider";
import { Money } from "@/components/Money";
import { useOrder } from "@/hooks/useOrder";

export const FinalizedSummary = () => {
  const { order } = useOrder();

  const formatMessage = useFormattedMessages();

  const totalPrice = order.total.gross;
  const taxCost = order.total.tax;

  const getTaxPercentage = (): number => {
    if (!totalPrice || !taxCost) {
      return 0;
    }

    return taxCost.amount / totalPrice.amount;
  };

  return (
    <div className="summary">
      <div className="summary-title open">
        <div className="flex flex-row items-center">
          <Text size="lg" weight="bold">
            {formatMessage("summary")}
          </Text>
        </div>
      </div>

      <div className="w-full h-12" />
      <ul className="summary-items">
        {order.lines.map((line) => (
          <SummaryItem key={line.id} line={line as OrderLine} readOnly />
        ))}
      </ul>
      <div className="summary-recap">
        <div className="summary-row">
          <Text weight="bold">{formatMessage("subtotal")}</Text>
          <Money weight="bold" money={order.subtotal.gross} />
        </div>
        <Divider className="my-4" />
        <div className="summary-row mb-2">
          <Text color="secondary">{formatMessage("shippingCost")}</Text>
          <Money color="secondary" money={order.shippingPrice.gross} />
        </div>
        <div className="summary-row">
          <Text color="secondary">
            {formatMessage("taxCost", {
              taxPercentage: getTaxPercentage(),
            })}
          </Text>
          <Money color="secondary" money={taxCost} />
        </div>
        <Divider className="my-4" />
        <div className="summary-row">
          <Text size="md" weight="bold">
            {formatMessage("total")}
          </Text>
          <Money weight="bold" money={totalPrice} />
        </div>
      </div>
    </div>
  );
};
