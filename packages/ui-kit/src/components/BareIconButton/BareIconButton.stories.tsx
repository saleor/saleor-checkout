import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { BareIconButton } from "./BareIconButton";
import { RemoveIcon } from "../icons";

export default {
  title: "Components/BareIconButton",
  component: BareIconButton,
} as ComponentMeta<typeof BareIconButton>;

const Template: ComponentStory<typeof BareIconButton> = (args) => (
  <BareIconButton {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  icon: <RemoveIcon />,
  onClick: action("onClick"),
};

export const WithImage = Template.bind({});

WithImage.args = {
  icon: <img src='/plus.svg' alt='Samle img' />, // eslint-disable-line
  onClick: action("onClick"),
};
