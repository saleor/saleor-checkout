import AppHeader from "@elements/AppHeader";
import {
  IconButton,
  OffsettedList,
  OffsettedListBody,
  OffsettedListItem,
  OffsettedListItemCell,
  SettingsIcon,
  useOffsettedListWidths,
} from "@saleor/macaw-ui";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Typography,
} from "@material-ui/core";
import { ChannelPaymentOptions } from "api/app/types";
import { Channel } from "api/saleor/types";
import { paymentProviders } from "consts";
import { useStyles } from "./styles";
import AppSidebar from "@elements/AppSidebar";

interface ChannelDetailsProps {
  channelPaymentOptions?: ChannelPaymentOptions;
  channels?: Channel[];
}

const ChannelDetails: React.FC<ChannelDetailsProps> = ({
  channelPaymentOptions,
  channels,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const { actions } = useOffsettedListWidths();

  const onBackClick = () => {
    router.push("/channels");
  };

  const onSettingsClick = () => {
    router.push({
      pathname: "/payment-providers/[paymentProviderId]",
      query: {
        paymentProviderId: paymentProviders[0].id,
        channelId: channelPaymentOptions?.channel.id,
      },
    });
  };

  const onChannelClick = (channel: Channel) => {
    router.push({
      pathname: "/channels/[channelId]",
      query: { channelId: channel.id },
    });
  };

  return (
    <>
      <AppHeader
        onBack={onBackClick}
        menu={
          <IconButton onClick={onSettingsClick}>
            <SettingsIcon />
          </IconButton>
        }
      >
        {channelPaymentOptions?.channel.label}
      </AppHeader>
      <div className={classes.root}>
        <AppSidebar
          items={channels}
          selectedItem={channelPaymentOptions?.channel}
          onItemClick={onChannelClick}
        />
        <div className={classes.paymentOptionList}>
          <Typography variant="subtitle1">Select payment methods</Typography>
          {channelPaymentOptions?.paymentOptions.map((paymentOption) => (
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
                          <Switch
                            checked={
                              provider.id === paymentOption.activeProvider?.id
                            }
                          />
                        </OffsettedListItemCell>
                      </OffsettedListItem>
                    ))}
                  </OffsettedListBody>
                </OffsettedList>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};
export default ChannelDetails;
