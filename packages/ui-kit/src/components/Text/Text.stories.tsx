import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Text } from "./Text";

export default {
  title: "Components/Text",
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Small = Template.bind({});

Small.args = {
  size: "sm",
  children: "Example of small text paragraph",
};

export const Medium = Template.bind({});

Medium.args = {
  size: "md",
  children: "Example of medium text paragraph",
  weight: "semibold",
};

export const Large = Template.bind({});

Large.args = {
  size: "lg",
  children: "Example of large text paragraph",
  weight: "bold",
};
