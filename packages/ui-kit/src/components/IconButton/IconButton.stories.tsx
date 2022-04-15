import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconButton } from "./IconButton";
import { DiscountIcon, EditIcon, TrashIcon, RemoveIcon } from "../icons";

export default {
  title: "Components/IconButton",
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  icon: <DiscountIcon />,
  label: "Button label",
};

export const Reverse = Template.bind({});

Reverse.args = {
  icon: <EditIcon />,
  label: "Button label",
  reverse: true,
};

export const OnlyIcon = Template.bind({});

OnlyIcon.args = {
  icon: <TrashIcon />,
};

export const Bare = Template.bind({});

Bare.args = {
  icon: <RemoveIcon />,
  variant: "bare",
};

export const BareWithImage = Template.bind({});

BareWithImage.args = {
  icon: <img src='/plus.svg' alt='Samle img' />, // eslint-disable-line
  variant: "bare",
};
