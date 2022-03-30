import { useRouter } from "next/router";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Item, PaymentProvider, PaymentProviderID } from "types/common";
import { paymentProviders } from "consts";
import VerticalSpacer from "@frontend/components/elements/VerticalSpacer";
import { channelListPath, channelPath, paymentProviderPath } from "routes";
import { FormattedMessage, useIntl } from "react-intl";
import { useStyles } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { messages } from "./messages";
import { sectionMessages } from "@frontend/misc/commonMessages";
import AppLayout from "@frontend/components/elements/AppLayout";
import AppSavebar from "@frontend/components/elements/AppSavebar";
import Setting from "@frontend/components/elements/Setting";
import { PaymentProviderSettingsValues } from "types/api";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import Skeleton from "@material-ui/lab/Skeleton";

interface PaymentProviderDetailsProps {
  selectedPaymentProvider?: PaymentProvider<PaymentProviderID>;
  channelId?: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (data: PaymentProviderSettingsValues) => void;
}

const PaymentProviderDetails: React.FC<PaymentProviderDetailsProps> = ({
  selectedPaymentProvider,
  channelId,
  saveButtonBarState,
  loading,
  onCancel,
  onSubmit,
}) => {
  const router = useRouter();
  const intl = useIntl();
  const classes = useStyles();
  const { control, handleSubmit: handleSubmitForm, formState } = useForm();

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

  const onPaymentProviderClick = (paymentProvider: Item) => {
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

  const handleSubmit = (flattedOptions: Record<string, string>) => {
    const paymentProviderOptions = selectedPaymentProvider?.settings.map(
      (setting) => setting.id as string
    );
    // Legacy fields from different subpage using the same form might be still present, this should filter them out
    const filteredFlattedOptions = Object.keys(flattedOptions).reduce(
      (options, optionKey) => {
        if (!paymentProviderOptions?.includes(optionKey)) {
          return options;
        }
        return {
          ...options,
          [optionKey]: flattedOptions[optionKey],
        };
      },
      {}
    );

    onSubmit(
      (selectedPaymentProvider?.id
        ? {
            [selectedPaymentProvider.id]: filteredFlattedOptions,
          }
        : {}) as PaymentProviderSettingsValues
    );
  };

  return (
    <form>
      <AppLayout
        title={intl.formatMessage(sectionMessages.settings)}
        onBackClick={onBackClick}
        items={paymentProviders}
        selectedItem={selectedPaymentProvider}
        loading={loading}
        onItemClick={onPaymentProviderClick}
      >
        <Card>
          <CardContent>
            <Typography variant="body1">
              <FormattedMessage {...messages.paymentProviderSettings} />
            </Typography>
            <VerticalSpacer />
            <div className={classes.settings}>
              {selectedPaymentProvider?.settings?.map(
                ({ id, type, label, value }) =>
                  loading ? (
                    <Skeleton />
                  ) : (
                    <Controller
                      key={id}
                      name={id}
                      control={control}
                      defaultValue={value}
                      render={({ field }) => (
                        <Setting
                          name={field.name}
                          type={type}
                          label={label}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                  )
              )}
            </div>
          </CardContent>
        </Card>
      </AppLayout>
      <AppSavebar
        disabled={loading || !formState.isDirty}
        state={saveButtonBarState}
        onCancel={onCancel}
        onSubmit={handleSubmitForm(handleSubmit)}
      />
    </form>
  );
};
export default PaymentProviderDetails;
