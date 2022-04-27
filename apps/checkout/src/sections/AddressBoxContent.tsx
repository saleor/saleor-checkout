import { Text } from "@saleor/ui-kit";
import React from "react";
import { RadioOptionChildrenProps } from "@/components/Radio";
import { IconButton } from "@/components/IconButton";
import { PenIcon, TrashIcon } from "@/icons";
import { AddressField } from "@/lib/globalTypes";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { getSortedAddressFieldsFromAddress } from "@/lib/utils";
import { pull } from "lodash-es";
import { Label } from "@/components/Label";

interface AddressBoxContentProps extends RadioOptionChildrenProps {
  address: Partial<Record<AddressField, any>>;
  onEdit: () => void;
  onDelete: () => void;
}

export const AddressBoxContent: React.FC<AddressBoxContentProps> = ({
  address,
  htmlFor,
  onDelete,
  onEdit,
}) => {
  const formatMessage = useFormattedMessages();
  const name = `${address.firstName} ${address.lastName}`;

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-col">
        <Label htmlFor={htmlFor}>
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
          onClick={onDelete}
          ariaLabel={formatMessage("deleteAddressLabel")}
          icon={<img src={TrashIcon} />}
        />
      </div>
    </div>
  );
};
