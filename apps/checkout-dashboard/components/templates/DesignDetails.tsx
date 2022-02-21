import AppNavigation from "@elements/AppNavigation";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import {
  makeStyles,
  OffsettedList,
  OffsettedListBody,
  OffsettedListItem,
  OffsettedListItemCell,
} from "@saleor/macaw-ui";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      gap: "2rem",
    },
    optionList: {
      flex: "1",
    },
    optionListItem: {
      height: "70px",
      cursor: "pointer",
    },
    optionContent: {
      height: "100px", // TEMPORARY VALUE
    },
    panel: {
      "& .MuiAccordionDetails-root": {
        padding: 0,
        paddingTop: theme.spacing(1),
      },
      "&.Mui-expanded": {
        margin: theme.spacing(2, 0),
        minHeight: 0,
        "&:first-child": {
          margin: theme.spacing(2, 0),
        },
      },
      "&:before": {
        display: "none",
      },
      display: "",
      margin: theme.spacing(2, 0),
      minHeight: 0,
      width: "100%",
      borderRadius: 6,
    },
    panelExpander: {
      "&.MuiAccordionSummary-root": {
        padding: theme.spacing(0, 4),
        "&.Mui-expanded": {
          minHeight: 0,
        },
      },
      "&> .MuiAccordionSummary-content": {
        margin: 0,
        padding: theme.spacing(2, 0),
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
        padding: theme.spacing(0, 2),
      },
      margin: 0,
      minHeight: 0,
    },
    panelDetails: {
      "&> section": {
        width: "100%",
      },
    },
    design: {
      flex: "2",
    },
    designPreview: {
      background: "#fff",
      minHeight: "500px", // TEMPORARY VALUE
      boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.16)",
      margin: "1rem 0 0 0",
    },
  }),
  { name: "DesignDetails" }
);

interface Option {
  id: string;
  name: string;
}
interface DesignDetailsProps {
  options: Option[];
}

const DesignDetails: React.FC<DesignDetailsProps> = ({ options }) => {
  const classes = useStyles();

  return (
    <>
      <AppNavigation />
      <div className={classes.root}>
        <OffsettedList gridTemplate={["1fr"]} className={classes.optionList}>
          <OffsettedListBody>
            {options.map((option) => (
              <Accordion
                key={option.id}
                className={classes.panel}
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.panelExpander}
                >
                  <Typography variant="body1">{option.name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.panelDetails}>
                  <div className={classes.optionContent}></div>
                </AccordionDetails>
              </Accordion>
              // <OffsettedListItem
              //   key={option.id}
              //   className={classes.optionListItem}
              // >
              //   <OffsettedListItemCell>{option.name}</OffsettedListItemCell>
              // </OffsettedListItem>
            ))}
          </OffsettedListBody>
        </OffsettedList>
        <div className={classes.design}>
          <Typography variant="subtitle1">Design preview</Typography>
          <div className={classes.designPreview}>Design</div>
        </div>
      </div>
    </>
  );
};
export default DesignDetails;
