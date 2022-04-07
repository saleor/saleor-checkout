import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Checkbox } from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  label: "Selector Label",
};

export const Checked = Template.bind({});

Checked.args = {
  label: "Selector Label",
  checked: true,
};

export const WithoutLabel = Template.bind({});

WithoutLabel.args = {
  checked: true,
};
