import * as React from "react";
import Icon from "./components/Icon";
import Text from "./components/Text";

export const Checkout = () => {
  return (
    <div>
      <Text size="xl" bold>
        Saleor Checkout
      </Text>
      <Text size="sm" color="secondary">
        (Greatest checkout ever)
      </Text>
      <Icon />
    </div>
  );
};
