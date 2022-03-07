import AppHeader from "@elements/AppHeader";
import { useRouter } from "next/router";
import { Card, CardContent, Typography } from "@material-ui/core";
import { PaymentProvider, PaymentProviderID } from "types";
import { paymentProviders } from "consts";
import { useStyles } from "./styles";
import AppSidebar from "@elements/AppSidebar";
import SettingList from "@elements/SettingList";
import VerticalSpacer from "@elements/VerticalSpacer";
import { channelListPath, channelPath, paymentProviderPath } from "routes";

interface PaymentProviderDetailsProps {
  selectedPaymentProvider?: PaymentProvider<PaymentProviderID>;
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
        pathname: channelPath,
        query: {
          channelId: channelId,
        },
      });
    } else {
      router.push(channelListPath);
    }
  };

  const onPaymentProviderClick = (
    paymentProvider: PaymentProvider<PaymentProviderID>
  ) => {
    if (channelId) {
      router.push({
        pathname: paymentProviderPath,
        query: {
          paymentProviderId: paymentProvider.id,
          channelId,
        },
      });
    } else {
      router.push({
        pathname: paymentProviderPath,
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
            <CardContent>
              <Typography variant="body1">Payment provider settings</Typography>
              <VerticalSpacer />
              <SettingList settings={selectedPaymentProvider.settings} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default PaymentProviderDetails;
