import { FC, ReactNode, useState } from "react";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";

import styles from "./Select.module.css";
import { ChevronDownIcon } from "../icons";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

interface Option {
  label: string | ReactNode;
  [key: string]: unknown;
}

export interface SelectProps {
  options: Option[];
}

export const Select: FC<SelectProps> = ({ ...rest }) => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className={clsx(styles.container)}>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Button className={clsx(styles.trigger)}>
          {({ open }) => {
            return (
              <>
                {selectedPerson}
                <span
                  className={clsx(styles["arrow-container"], {
                    [styles["arrow-container-open"]]: open,
                  })}>
                  <ChevronDownIcon />
                </span>
              </>
            );
          }}
        </Combobox.Button>
        <Combobox.Options className={clsx(styles.options)}>
          {people.map((person) => (
            <Combobox.Option
              key={person}
              value={person}
              className={clsx(styles.option)}>
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
