import { Text } from "@/components/Text";
import { OrderLine } from "@/graphql";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { useFormattedMoney } from "@/hooks/useFormattedMoney";
import { Money } from "@/components/Money";
import clsx from "clsx";

interface LineItemQuantitySelectorProps {
  line: OrderLine;
}

export const SummaryItemMoneySection: React.FC<
  LineItemQuantitySelectorProps
> = ({ line }) => {
  const {
    variant: { id: variantId, pricing },
  } = line;

  const piecePrice = pricing?.price?.gross;
  const formatMessage = useFormattedMessages();
  const formattedPiecePrice = useFormattedMoney(piecePrice);

  const multiplePieces = line.quantity > 1;

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-row justify-end">
        {pricing?.onSale && (
          <Money
            ariaLabel={formatMessage("undiscountedPriceLabel")}
            money={{
              currency: pricing?.priceUndiscounted?.gross.currency as string,
              amount:
                (pricing?.priceUndiscounted?.gross.amount || 0) * line.quantity,
            }}
            className="line-through mr-1"
          />
        )}
        <Money
          ariaLabel={formatMessage("totalPriceLabel")}
          money={{
            currency: piecePrice?.currency as string,
            amount: (piecePrice?.amount || 0) * line.quantity,
          }}
          weight="bold"
          className={clsx({
            "text-text-error": pricing?.onSale,
          })}
        />
      </div>
      <Text>qty: {line.quantity}</Text>
      {multiplePieces && (
        <Text
          ariaLabel={formatMessage("singlePiecePriceLabel")}
          size="sm"
          color="secondary"
          className="ml-4"
        >
          {`${formattedPiecePrice} ${formatMessage("each")}`}
        </Text>
      )}
    </div>
  );
};
