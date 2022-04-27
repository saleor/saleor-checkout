import { Radio, Text } from "@saleor/ui-kit";
import React, { useId, useRef } from "react";
import { IconButton } from "@/components/IconButton";
import { PenIcon, TrashIcon } from "@/icons";
import { AddressField } from "@/lib/globalTypes";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import {
  getSortedAddressFieldsFromAddress,
  handleInputChange,
} from "@/lib/utils";
import { pull } from "lodash-es";
import { Label } from "@/components/Label";
import { RadioBoxProps } from "@/components/RadioBox";

interface AddressRadioBoxProps extends RadioBoxProps {
  address: Partial<Record<AddressField, any>>;
  onEdit: () => void;
  onDelete: () => void;
}

export const AddressRadioBox: React.FC<AddressRadioBoxProps> = ({
  address,
  onDelete,
  onEdit,
  onSelect,
  ...rest
}) => {
  const formatMessage = useFormattedMessages();
  const name = `${address.firstName} ${address.lastName}`;
  const id = useRef(useId());

  return (
    <div className="radio-box address-radio-box">
      <Radio {...rest} onSelect={handleInputChange(onSelect)} id={id.current} />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          <Label htmlFor={id.current}>
            <Text weight="semibold">{name}</Text>
            {pull(
              getSortedAddressFieldsFromAddress(address),
              "firstName",
              "lastName"
            ).map((field: AddressField) => (
              <Text key={field}>{address[field] as string}</Text>
            ))}
          </Label>
        </div>
        <div>
          <IconButton
            variant="bare"
            icon={<img src={PenIcon} />}
            onClick={onEdit}
            ariaLabel={formatMessage("editAddressLabel")}
            className="mr-2"
          />
          <IconButton
            variant="bare"
            onClick={onDelete}
            ariaLabel={formatMessage("deleteAddressLabel")}
            icon={<img src={TrashIcon} />}
          />
        </div>
      </div>
    </div>
  );
};
