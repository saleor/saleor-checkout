import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";

import { Radio, RadioProps } from "./Radio";

export default {
  title: "Components/Radio",
  component: Radio,
} as ComponentMeta<typeof Radio>;

const options: RadioProps[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];

const Template: Story<{ customOptions: RadioProps[] }> = ({
  customOptions = [],
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const radioOptions = [...options, ...customOptions];

  return (
    <div role="radiogroup" aria-label="radios" className="radio-box-group">
      {radioOptions.map((option) => (
        <Radio
          {...option}
          key={option.value as string}
          checked={option.value === selected}
          onChange={(event) => {
            console.log(event.target);
            setSelected(event.target.value);
          }}
        />
      ))}
    </div>
  );
};

export const CustomLook = Template.bind({});

CustomLook.args = {
  customOptions: [
    {
      classNames: {
        container:
          "flex !flex-col px-[15px] py-[21px] border hover:border-border-active",
        radio: "!border-sky-500",
      },
      value: "extended",
      label: (
        <>
          <span>Extended label</span>
          <br />
          <span className="text-text-secondary">very extended description</span>
        </>
      ),
    },
  ],
};
