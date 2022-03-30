import {
  ConfirmButtonTransitionState,
  OffsettedList,
  OffsettedListBody,
  OffsettedListItem,
  OffsettedListItemCell,
  useOffsettedListWidths,
} from "@saleor/macaw-ui";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Typography,
} from "@material-ui/core";
import {
  ChannelActivePaymentProviders,
  ChannelPaymentOptions,
} from "types/api";
import { Channel } from "types/saleor";
import { paymentProviders } from "consts";
import { useStyles } from "./styles";
import { channelListPath, channelPath, paymentProviderPath } from "routes";
import { messages } from "./messages";
import AppLayout from "@frontend/components/elements/AppLayout";
import {
  flattenSettingId,
  mapNodesToItems,
  mapNodeToItem,
  unflattenSettings,
} from "@frontend/utils";
import { Item, Node, PaymentProviderID } from "types/common";
import Skeleton from "@material-ui/lab/Skeleton";
import AppSavebar from "@frontend/components/elements/AppSavebar";
import { Controller, useForm } from "react-hook-form";

interface ChannelDetailsProps {
  channelPaymentOptions?: ChannelPaymentOptions;
  channels?: Channel[];
  saveButtonBarState: ConfirmButtonTransitionState;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (data: ChannelActivePaymentProviders) => void;
}

const ChannelDetails: React.FC<ChannelDetailsProps> = ({
  channelPaymentOptions,
  channels,
  saveButtonBarState,
  loading,
  onCancel,
  onSubmit,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const { control, handleSubmit: handleSubmitForm, formState } = useForm();
  const { actions } = useOffsettedListWidths();

  const onBackClick = () => {
    router.push(channelListPath);
  };

  const onSettingsClick = () => {
    router.push({
      pathname: paymentProviderPath,
      query: {
        paymentProviderId: paymentProviders[0].id,
        channelId: channelPaymentOptions?.channel.id,
      },
    });
  };

  const onChannelClick = (channel: Item) => {
    router.push({
      pathname: channelPath,
      query: { channelId: channel.id },
    });
  };

  const handleSubmit = (flattedSettings: Record<string, boolean>) => {
    const selectedPaymentProviders = unflattenSettings<boolean, Node>(
      flattedSettings,
      channelPaymentOptions?.paymentOptions || []
    );
    console.log(selectedPaymentProviders);
    const activePaymentProviders = Object.keys(selectedPaymentProviders).reduce(
      (activePaymentProviders, paymentProviderId) => {
        const paymentProvider = selectedPaymentProviders[paymentProviderId];
        if (paymentProvider) {
          const selectedPaymentProvider = Object.keys(paymentProvider).find(
            (settingId) => paymentProvider[settingId] === true
          );
          return {
            ...activePaymentProviders,
            [paymentProviderId]: selectedPaymentProvider,
          };
        }
        return activePaymentProviders;
      },
      {} as ChannelActivePaymentProviders[string]
    );
    console.log(activePaymentProviders);

    const channelActivePaymentProviders: ChannelActivePaymentProviders =
      channelPaymentOptions?.channel.id
        ? {
            [channelPaymentOptions.channel.id]: activePaymentProviders,
          }
        : {};

    onSubmit(channelActivePaymentProviders);
  };

  return (
    <form>
      <AppLayout
        title={channelPaymentOptions?.channel?.name || ""}
        onBackClick={onBackClick}
        onSettingsClick={onSettingsClick}
        items={mapNodesToItems(channels)}
        selectedItem={
          channelPaymentOptions?.channel &&
          mapNodeToItem(channelPaymentOptions?.channel)
        }
        loading={loading}
        onItemClick={onChannelClick}
      >
        <Typography variant="subtitle1">
          <FormattedMessage {...messages.selectPaymentMethods} />
        </Typography>
        {loading ? (
          <Skeleton />
        ) : (
          channelPaymentOptions?.paymentOptions.map(
            (paymentOption, paymentOptionIdx) => (
              <Accordion
                key={paymentOption.method.id}
                className={classes.paymentOption}
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.paymentOptionExpander}
                >
                  <div className={classes.paymentOptionIcon}></div>
                  <Typography variant="subtitle2">
                    {paymentOption.method.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.paymentOptionDetails}>
                  <OffsettedList gridTemplate={["1fr", actions(1)]}>
                    <OffsettedListBody>
                      {paymentOption.availableProviders.map((provider) => (
                        <OffsettedListItem
                          key={provider.id}
                          className={classes.paymentMethod}
                        >
                          <OffsettedListItemCell>
                            {provider.label}
                          </OffsettedListItemCell>
                          <OffsettedListItemCell padding="action">
                            <Controller
                              key={provider.id}
                              name={flattenSettingId(
                                paymentOptionIdx,
                                provider.id
                              )}
                              control={control}
                              defaultValue={
                                provider.id === paymentOption.activeProvider?.id
                              }
                              render={({ field }) => (
                                <Switch
                                  name={field.name}
                                  checked={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                />
                              )}
                            />
                          </OffsettedListItemCell>
                        </OffsettedListItem>
                      ))}
                    </OffsettedListBody>
                  </OffsettedList>
                </AccordionDetails>
              </Accordion>
            )
          )
        )}
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
export default ChannelDetails;
