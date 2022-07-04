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
import { useStyles } from "./styles";
import { channelListPath, channelPath, paymentProviderPath } from "routes";
import { messages } from "./messages";
import AppLayout from "@/checkout-app/frontend/components/elements/AppLayout";
import {
  flattenSettingId,
  mapNodesToItems,
  mapNodeToItem,
} from "@/checkout-app/frontend/utils";
import { Item } from "types/common";
import Skeleton from "@material-ui/lab/Skeleton";
import AppSavebar from "@/checkout-app/frontend/components/elements/AppSavebar";
import { Controller, useForm } from "react-hook-form";
import { getActivePaymentProvider, getFormDefaultValues } from "./data";
import { useEffect } from "react";
import { ChannelFragment, MetadataErrorFragment } from "@/checkout-app/graphql";
import { getMetadataErrorMessage } from "@/checkout-app/frontend/misc/errors";
import ErrorAlert from "../../elements/ErrorAlert";
import { usePaymentProviders } from "@/checkout-app/config/fields";

interface ChannelDetailsProps {
  channelPaymentOptions: ChannelPaymentOptions;
  channels: ChannelFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  loading: boolean;
  errors?: Partial<MetadataErrorFragment>[];
  onCancel: () => void;
  onSubmit: (data: ChannelActivePaymentProviders) => void;
}

const ChannelDetails: React.FC<ChannelDetailsProps> = ({
  channelPaymentOptions,
  channels,
  saveButtonBarState,
  loading,
  errors,
  onCancel,
  onSubmit,
}) => {
  const paymentProviders = usePaymentProviders();
  const router = useRouter();
  const classes = useStyles();
  const { actions } = useOffsettedListWidths();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState,
    reset: resetForm,
  } = useForm({
    shouldUnregister: true, // Legacy fields from different subpage using the same form might be still present, this should unregister them
  });

  useEffect(() => {
    resetForm(getFormDefaultValues(channelPaymentOptions)); // Update values on subpage change as the same form is used
  }, [channelPaymentOptions, resetForm]);

  const onBackClick = () => {
    void router.push(channelListPath);
  };

  const onSettingsClick = () => {
    void router.push({
      pathname: paymentProviderPath,
      query: {
        channelId: channelPaymentOptions.channel.id,
        paymentProviderId: paymentProviders[0].id,
      },
    });
  };

  const onChannelClick = (channel: Item) => {
    void router.push({
      pathname: channelPath,
      query: { channelId: channel.id },
    });
  };

  const handleSubmit = (flattenedSettings: Record<string, string>) => {
    onSubmit({
      [channelPaymentOptions.channel.id]: flattenedSettings,
    } as ChannelActivePaymentProviders);
  };

  return (
    <form>
      <AppLayout
        title={channelPaymentOptions.channel.name}
        onBackClick={onBackClick}
        onSettingsClick={onSettingsClick}
        items={mapNodesToItems(channels)}
        selectedItem={mapNodeToItem(channelPaymentOptions.channel)}
        loading={loading}
        onItemClick={onChannelClick}
      >
        <ErrorAlert
          errors={errors}
          getErrorMessage={(error, intl) =>
            error.code
              ? getMetadataErrorMessage(error.code, intl)
              : error.message
          }
        />
        <Typography variant="subtitle1">
          <FormattedMessage {...messages.selectPaymentMethods} />
        </Typography>
        {loading ? (
          <Skeleton className={classes.skeleton} />
        ) : (
          channelPaymentOptions.paymentOptions.map(
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
                  {paymentOption.method.logo && (
                    <div className={classes.paymentOptionLogo}>
                      <paymentOption.method.logo />
                    </div>
                  )}
                  <Typography variant="subtitle2">
                    {paymentOption.method.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.paymentOptionDetails}>
                  <OffsettedList gridTemplate={["1fr", actions(1)]}>
                    <Controller
                      key={paymentOption.id}
                      name={paymentOption.id}
                      control={control}
                      defaultValue={getActivePaymentProvider(paymentOption)}
                      render={({ field }) => (
                        <OffsettedListBody>
                          {paymentOption.availableProviders.map((provider) => (
                            <OffsettedListItem
                              key={provider.id}
                              className={classes.paymentMethod}
                            >
                              <OffsettedListItemCell>
                                {provider.logo ? (
                                  <provider.logo
                                    className={classes.paymentMethodLogo}
                                  />
                                ) : (
                                  provider.label
                                )}
                              </OffsettedListItemCell>
                              <OffsettedListItemCell padding="action">
                                <Switch
                                  name={flattenSettingId(
                                    "channelActivePaymentProviders",
                                    paymentOptionIdx,
                                    provider.id
                                  )}
                                  checked={field.value === provider.id}
                                  onChange={() =>
                                    field.onChange({
                                      target: {
                                        name: paymentOption.id,
                                        value:
                                          field.value === provider.id
                                            ? ""
                                            : provider.id,
                                      },
                                    })
                                  }
                                  onBlur={field.onBlur}
                                />
                              </OffsettedListItemCell>
                            </OffsettedListItem>
                          ))}
                        </OffsettedListBody>
                      )}
                    />
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmitForm(handleSubmit)}
      />
    </form>
  );
};
export default ChannelDetails;
