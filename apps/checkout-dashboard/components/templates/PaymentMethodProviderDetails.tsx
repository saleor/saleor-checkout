import AppHeader from "@elements/AppHeader";
import {
  makeStyles,
  OffsettedList,
  OffsettedListBody,
  OffsettedListItem,
  OffsettedListItemCell,
} from "@saleor/macaw-ui";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Card, CardContent, CardHeader } from "@material-ui/core";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      gap: "2rem",
    },
    paymentMethodList: {
      flex: "1",
    },
    paymentMethodListItem: {
      height: "70px",
      cursor: "pointer",
    },
    paymentMethodListItemActive: {
      borderLeft: `${theme.palette.primary.main} solid 0.5rem`,
    },
    settings: {
      flex: "2",
    },
  }),
  { name: "PaymentMethodProviderDetails" }
);

interface PaymentMethodProvider {
  id: string;
  name: string;
  active: boolean;
}
interface PaymentMethod {
  id: string;
  name: string;
  providers: PaymentMethodProvider[];
}
interface Channel {
  id: string;
  name: string;
  paymentMethods: PaymentMethod[];
}
interface PaymentMethodProviderDetailsProps {
  selectedChannel?: Channel;
  selectedPaymentMethod?: PaymentMethod;
  paymentMethods?: PaymentMethod[];
}

const PaymentMethodProviderDetails: React.FC<
  PaymentMethodProviderDetailsProps
> = ({ selectedChannel, selectedPaymentMethod, paymentMethods }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <AppHeader
        onBack={() =>
          router.push({
            pathname: "/channels/[channelId]",
            query: { channelId: selectedChannel?.id },
          })
        }
      >
        Settings
      </AppHeader>
      <div className={classes.root}>
        <OffsettedList
          gridTemplate={["1fr"]}
          className={classes.paymentMethodList}
        >
          <OffsettedListBody>
            {paymentMethods?.map((paymentMethod) => (
              <OffsettedListItem
                key={paymentMethod.id}
                className={classNames(classes.paymentMethodListItem, {
                  [classes.paymentMethodListItemActive]:
                    paymentMethod.id === selectedPaymentMethod?.id,
                })}
                onClick={() =>
                  router.push({
                    pathname:
                      "/channels/[channelId]/payment-method-providers/[paymentMethodId]",
                    query: {
                      channelId: selectedChannel?.id,
                      paymentMethodId: paymentMethod.id,
                    },
                  })
                }
              >
                <OffsettedListItemCell>
                  {paymentMethod.name}
                </OffsettedListItemCell>
              </OffsettedListItem>
            ))}
          </OffsettedListBody>
        </OffsettedList>
        <div className={classes.settings}>
          <Card>
            <CardContent>Payment provider settings</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default PaymentMethodProviderDetails;
