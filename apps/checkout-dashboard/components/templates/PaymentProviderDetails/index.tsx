import AppHeader from "@elements/AppHeader";
import { useRouter } from "next/router";
import { Card, CardContent } from "@material-ui/core";
import { PaymentProvider } from "types";
import { paymentProviders } from "consts";
import { useStyles } from "./styles";
import AppSidebar from "@elements/AppSidebar";

interface PaymentProviderDetailsProps {
  selectedPaymentProvider?: PaymentProvider;
  channelId?: string;
}

const PaymentProviderDetails: React.FC<PaymentProviderDetailsProps> = ({
  selectedPaymentProvider,
  channelId,
}) => {
  const router = useRouter();
  const classes = useStyles();

  const onBackClick = () => {
    if (channelId) {
      router.push({
        pathname: "/channels/[channelId]",
        query: {
          channelId: channelId,
        },
      });
    } else {
      router.push("/channels");
    }
  };

  const onPaymentProviderClick = (paymentProvider: PaymentProvider) => {
    if (channelId) {
      router.push({
        pathname: "/payment-providers/[paymentProviderId]",
        query: {
          paymentProviderId: paymentProvider.id,
          channelId,
        },
      });
    } else {
      router.push({
        pathname: "/payment-providers/[paymentProviderId]",
        query: {
          paymentProviderId: paymentProvider.id,
        },
      });
    }
  };

  return (
    <>
      <AppHeader onBack={onBackClick}>Settings</AppHeader>
      <div className={classes.root}>
        <AppSidebar
          items={paymentProviders}
          selectedItem={selectedPaymentProvider}
          onItemClick={onPaymentProviderClick}
        />
        <div className={classes.providerSettings}>
          <Card>
            <CardContent>Payment provider settings</CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default PaymentProviderDetails;
