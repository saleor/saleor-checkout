import { useState, useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SelectProps, Select, Option } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

type CountryCode = "LOL" | "NOM" | "FOO";

const Template = ({
  selectedValue: propsSelectedValue,
  ...args
}: SelectProps<CountryCode>) => {
  const [selectedValue, setSelectedValue] = useState<CountryCode>(
    propsSelectedValue as CountryCode
  );

  useEffect(() => {
    setSelectedValue(selectedValue);
  }, [selectedValue]);

  return (
    <div className="w-[440px]">
      <Select
        classNames={{ container: "border border-border-active" }}
        options={lols}
        selectedValue={selectedValue}
        onChange={setSelectedValue}
      />
    </div>
  );
};

const lols: Option<CountryCode>[] = [
  {
    label: "lol",
    value: "LOL",
  },
  {
    label: "nom",
    value: "NOM",
  },
];

const users = [
  { label: "Durward Reynolds", value: "Durward Reynolds", id: "1" },
  { label: "Kenton Towne", value: "Kenton Towne", id: "2" },
  { label: "Therese Wunsch", value: "Therese Wunsch", id: "3" },
  { label: "Benedict Kessler", value: "Benedict Kessler", id: "4" },
  { label: "Katelyn Rohan", value: "Katelyn Rohan", id: "5" },
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
  { label: "Polska", value: "Polska", icon: "🇵🇱", id: "1" },
  { label: "Niemcy", value: "Niemcy", icon: "🇩🇪", id: "2" },
  { label: "USA", value: "USA", icon: "🇺🇸", id: "3" },
  { label: "Francja", value: "Francja", icon: "🇫🇷", id: "4" },
  { label: "Bangladesz", value: "Bangladesz", icon: "🇧🇩", id: "5" },
];

Countries.args = {
  selected: countries[0],
  options: countries,
};
