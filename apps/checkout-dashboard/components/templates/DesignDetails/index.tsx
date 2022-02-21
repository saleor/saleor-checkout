import AppNavigation from "@elements/AppNavigation";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { OffsettedList, OffsettedListBody } from "@saleor/macaw-ui";
import { DesignOption } from "api/app/types";
import { useStyles } from "./styles";

interface DesignDetailsProps {
  options: DesignOption[];
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
                className={classes.option}
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className={classes.optionExpander}
                >
                  <Typography variant="body1">{option.name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.optionDetails}>
                  <div className={classes.optionDetailsContent}></div>
                </AccordionDetails>
              </Accordion>
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
