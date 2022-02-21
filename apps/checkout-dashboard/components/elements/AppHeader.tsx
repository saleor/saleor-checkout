import { IconButton, ArrowRightIcon, makeStyles } from "@saleor/macaw-ui";

const useStyles = makeStyles(
  () => ({
    header: {
      display: "flex",
      gap: "1rem",
    },
    title: {
      margin: 0,
      width: "100%",
    },
    backArrow: {
      fontSize: 30,
      transform: "rotate(180deg)",
    },
  }),
  { name: "Channel" }
);

interface AppHeaderProps {
  onBack?: () => void;
  menu?: React.ReactNode;
}

const AppHeader: React.FC<AppHeaderProps> = ({ children, menu, onBack }) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      {onBack && (
        <IconButton onClick={onBack}>
          <ArrowRightIcon className={classes.backArrow} />
        </IconButton>
      )}
      <h1 className={classes.title}>{children}</h1>
      {menu}
    </header>
  );
};
export default AppHeader;
