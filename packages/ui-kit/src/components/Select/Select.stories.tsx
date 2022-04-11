import { useState, useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({ selected, ...args }) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  return (
    <Select {...args} selected={selectedOption} onChange={setSelectedOption} />
  );
};

const users = [
  { label: "Durward Reynolds" },
  { label: "Kenton Towne" },
  { label: "Therese Wunsch" },
  { label: "Benedict Kessler" },
  { label: "Katelyn Rohan" },
];

const commonArgs = {
  selected: users[0],
  options: users,
};

export const Basic = Template.bind({});

Basic.args = commonArgs;

export const Error = Template.bind({});

Error.args = {
  ...commonArgs,
  error: true,
};

export const Disabled = Template.bind({});

Disabled.args = {
  ...commonArgs,
  disabled: true,
};

export const Countries = Template.bind({});

const countries = [
  { label: "Polska", before: "🇵🇱" },
  { label: "Niemcy", before: "🇩🇪" },
  { label: "USA", before: "🇺🇸" },
  { label: "Francja", before: "🇫🇷" },
  { label: "Bangladesz", before: "🇧🇩" },
];

Countries.args = {
  selected: countries[0],
  options: countries,
};
