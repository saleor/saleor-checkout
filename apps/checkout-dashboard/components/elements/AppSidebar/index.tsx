import {
  OffsettedList,
  OffsettedListBody,
  OffsettedListItem,
  OffsettedListItemCell,
} from "@saleor/macaw-ui";
import classNames from "classnames";
import { useStyles } from "./styles";

interface Item {
  id: string;
  name: string;
}

interface AppSidebarProps {
  items: Item[];
  selectedItem?: Item;
  onItemClick: (item: Item) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  items,
  selectedItem,
  onItemClick,
}) => {
  const classes = useStyles();

  return (
    <OffsettedList gridTemplate={["1fr"]} className={classes.itemList}>
      <OffsettedListBody>
        {items?.map((item) => (
          <OffsettedListItem
            key={item.id}
            className={classNames(classes.itemListItem, {
              [classes.itemListItemActive]: item.id === selectedItem?.id,
            })}
            onClick={() => onItemClick(item)}
          >
            <OffsettedListItemCell>{item.name}</OffsettedListItemCell>
          </OffsettedListItem>
        ))}
      </OffsettedListBody>
    </OffsettedList>
  );
};
export default AppSidebar;
