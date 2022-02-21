import AppHeader from "@elements/AppHeader";
import {
  IconButton,
  makeStyles,
  OffsettedList,
  OffsettedListBody,
  OffsettedListItem,
  OffsettedListItemCell,
  SettingsIcon,
  useOffsettedListWidths,
} from "@saleor/macaw-ui";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import classNames from "classnames";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      gap: "2rem",
    },
    channelList: {
      flex: "1",
    },
    channelListItem: {
      height: "70px",
      cursor: "pointer",
    },
    channelListItemActive: {
      borderLeft: `${theme.palette.primary.main} solid 0.5rem`,
    },
    paymentMethodList: {
      flex: "2",
    },
    paymentMethodListItem: {
      height: "70px",
    },
    paymentMethodIcon: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      background: "#fff",
      marginRight: theme.spacing(2),
    },
    panel: {
      "& .MuiAccordionDetails-root": {
        padding: 0,
        paddingTop: theme.spacing(1),
      },
      "&.Mui-expanded": {
        margin: 0,
        minHeight: 0,
      },
      "&:before": {
        display: "none",
      },
      background: "none",
      display: "",
      margin: 0,
      minHeight: 0,
      width: "100%",
    },
    panelExpander: {
      "&.MuiAccordionSummary-root.Mui-expanded": {
        minHeight: 0,
      },
      "&> .MuiAccordionSummary-content": {
        margin: 0,
        padding: `${theme.spacing(2)} 0`,
        borderBottom: "1px solid rgba(40, 35, 74, 0.1)",
        display: "flex",
        alignItems: "center",
      },
      "&> .MuiAccordionSummary-expandIcon": {
        padding: 0,
        position: "absolute",
        right: theme.spacing(3),
      },
      "&> .MuiIconButton-root": {
        border: "none",
        background: "none",
      },
      margin: 0,
      minHeight: 0,
      padding: 0,
    },
    panelDetails: {
      "&> section": {
        width: "100%",
      },
    },
  }),
  { name: "ChannelDetails" }
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
interface ChannelDetailsProps {
  selectedChannel?: Channel;
  channels?: Channel[];
}

const ChannelDetails: React.FC<ChannelDetailsProps> = ({
  selectedChannel,
  channels,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const { actions } = useOffsettedListWidths();

  return (
    <>
      <AppHeader
        onBack={() => router.push("/channels")}
        menu={
          <IconButton
            onClick={() =>
              router.push({
                pathname:
                  "/channels/[channelId]/payment-method-providers/[paymentMethodId]",
                query: {
                  channelId: selectedChannel?.id,
                  paymentMethodId: selectedChannel?.paymentMethods[0].id,
                },
              })
            }
          >
            <SettingsIcon />
          </IconButton>
        }
      >
        {selectedChannel?.name}
      </AppHeader>
      <div className={classes.root}>
        <OffsettedList gridTemplate={["1fr"]} className={classes.channelList}>
          <OffsettedListBody>
            {channels?.map((channel) => (
              <OffsettedListItem
                key={channel.id}
                className={classNames(classes.channelListItem, {
                  [classes.channelListItemActive]:
                    channel.id === selectedChannel?.id,
                })}
                onClick={() =>
                  router.push({
                    pathname: "/channels/[channelId]",
                    query: { channelId: channel.id },
                  })
                }
              >
                <OffsettedListItemCell>{channel.name}</OffsettedListItemCell>
              </OffsettedListItem>
            ))}
          </OffsettedListBody>
        </OffsettedList>
        <div className={classes.paymentMethodList}>
          <Typography variant="subtitle1">Select payment methods</Typography>
          {selectedChannel?.paymentMethods.map((paymentMethod) => (
            <Accordion
              key={paymentMethod.id}
              className={classes.panel}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.panelExpander}
              >
                <div className={classes.paymentMethodIcon}></div>
                <Typography variant="subtitle2">
                  {paymentMethod.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.panelDetails}>
                <OffsettedList gridTemplate={["1fr", actions(1)]}>
                  <OffsettedListBody>
                    {paymentMethod.providers.map((provider) => (
                      <OffsettedListItem
                        key={provider.id}
                        className={classes.paymentMethodListItem}
                      >
                        <OffsettedListItemCell>
                          {provider.name}
                        </OffsettedListItemCell>
                        <OffsettedListItemCell padding="action">
                          <Switch checked={provider.active} />
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
