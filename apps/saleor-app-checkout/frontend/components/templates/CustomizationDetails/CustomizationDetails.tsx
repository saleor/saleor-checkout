import AppNavigation from "@/saleor-app-checkout/frontend/components/elements/AppNavigation";
import AppSavebar from "@/saleor-app-checkout/frontend/components/elements/AppSavebar";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import {
  OffsettedList,
  OffsettedListBody,
  ConfirmButtonTransitionState,
} from "@saleor/macaw-ui";
import {
  Customization,
  CustomizationID,
  PublicMetafieldID,
  CustomizationSettingID,
} from "types/common";
import {
  CustomizationSettingsFiles,
  CustomizationSettingsValues,
} from "types/api";
import { useStyles } from "./styles";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, Controller } from "react-hook-form";
import { messages } from "./messages";
import Setting from "@/saleor-app-checkout/frontend/components/elements/Setting";
import {
  flattenSettingId,
  unflattenSettings,
  unflattenValue,
} from "@/saleor-app-checkout/frontend/utils";
import Skeleton from "@material-ui/lab/Skeleton";
import { MetadataErrorFragment } from "@/saleor-app-checkout/graphql";
import { getMetadataErrorMessage } from "@/saleor-app-checkout/frontend/misc/errors";
import ErrorAlert from "../../elements/ErrorAlert";
import CheckoutPreviewFrame from "../../elements/CheckoutPreviewFrame";
import { isValidHttpUrl, useSettingsFromValues } from "./data";
import { useState } from "react";
import { debounce } from "lodash-es";

interface CustomizationDetailsProps {
  options: Customization<CustomizationID>[];
  checkoutUrl?: string;
  loading: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  errors?: Partial<MetadataErrorFragment>[];
  onCancel: () => void;
  onSubmit: (
    data: CustomizationSettingsValues,
    dataFiles?: CustomizationSettingsFiles,
    checkoutUrl?: string
  ) => Promise<void>;
}

const CustomizationDetails: React.FC<CustomizationDetailsProps> = ({
  options,
  checkoutUrl,
  loading,
  saveButtonBarState,
  errors,
  onCancel,
  onSubmit,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState,
    watch,
  } = useForm();
  const [files, setFiles] = useState<CustomizationSettingsFiles>();

  const previewSettings = useSettingsFromValues(options, watch);
  const [previewUrl, setPreviewUrl] = useState(checkoutUrl);

  const handleFileChange = <T extends CustomizationID>(
    optionId: T,
    settingId: CustomizationSettingID<T>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputFiles = event.target.files;
    if (!!inputFiles?.length) {
      setFiles({
        ...files,
        [optionId]: {
          [settingId]: inputFiles[0],
        },
      });
    }
  };

  const handleSubmit = async (flattenedValues: Record<string, string>) => {
    await onSubmit(
      unflattenSettings(
        "customizations",
        flattenedValues,
        options
      ) as CustomizationSettingsValues,
      files,
      unflattenValue("customizationsCheckoutUrl", flattenedValues)
    );
    setFiles(undefined);
  };

  return (
    <form>
      <AppNavigation />
      <div className={classes.root}>
        <OffsettedList gridTemplate={["1fr"]} className={classes.optionList}>
          <OffsettedListBody>
            {options.map((option, optionIdx) => (
              <Accordion
                key={option.id}
                className={classes.option}
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.optionExpander}
                >
                  <Typography variant="body1">{option.label}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.optionDetails}>
                  <div className={classes.optionDetailsContent}>
                    {loading ? (
                      <Skeleton className={classes.optionSkeleton} />
                    ) : (
                      option.settings?.map(({ id, type, label, value }) => (
                        <Controller
                          key={id}
                          name={flattenSettingId(
                            "customizations",
                            optionIdx,
                            id
                          )}
                          control={control}
                          defaultValue={value}
                          render={({ field }) => (
                            <Setting
                              name={field.name}
                              type={type}
                              label={label}
                              value={type === "image" ? value : field.value}
                              onChange={field.onChange}
                              onFileChange={(event) =>
                                handleFileChange(option.id, id, event)
                              }
                              onBlur={field.onBlur}
                            />
                          )}
                        />
                      ))
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </OffsettedListBody>
        </OffsettedList>
        <div className={classes.design}>
          <ErrorAlert
            errors={errors}
            getErrorMessage={(error, intl) =>
              error.code
                ? getMetadataErrorMessage(error.code, intl)
                : error.message
            }
          />
          <Typography variant="subtitle1">
            <FormattedMessage {...messages.customizationPreview} />
          </Typography>
          <div className={classes.designPreview}>
            {loading ? (
              <Skeleton className={classes.designSkeleton} />
            ) : (
              <>
                <Controller
                  name={
                    "customizationsCheckoutUrl" as PublicMetafieldID[number]
                  }
                  control={control}
                  defaultValue={checkoutUrl}
                  render={({ field }) => (
                    <TextField
                      name={field.name}
                      value={field.value}
                      label={intl.formatMessage(messages.checkoutUrl)}
                      className={classes.designUrlInput}
                      onChange={(event) => {
                        field.onChange(event);
                        debounce(
                          () => setPreviewUrl(event.target.value),
                          1000
                        )();
                      }}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {previewUrl && isValidHttpUrl(previewUrl) ? (
                  <CheckoutPreviewFrame
                    checkoutUrl={previewUrl}
                    settings={previewSettings}
                    className={classes.designPreviewFrame}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    className={classes.designNoPreview}
                  >
                    <FormattedMessage {...messages.noCheckoutUrl} />
                  </Typography>
                )}
              </>
            )}
          </div>
        </div>
      </div>
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
export default CustomizationDetails;
