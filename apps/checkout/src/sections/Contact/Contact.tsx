import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import { Checkbox } from "@components/Checkbox";
import { useToggleState } from "@react-stately/toggle";

export const Contact = () => {
  const formatMessage = useFormattedMessages();
  const { isSelected, setSelected } = useToggleState();

  return (
    <div>
      <div className="flex flex-row justify-between items-baseline">
        <Text variant="title">{formatMessage("contact")}</Text>
        <div className="flex flex-row">
          <Text color="secondary" className="mr-2">
            {formatMessage("haveAccount")}
          </Text>
          <Button variant="tertiary" title={formatMessage("signIn")} />
        </div>
      </div>
      {/* @ts-ignore TMP */}
      <TextInput label="Email address" className="my-4" />
      <Checkbox
        value="createAccount"
        label="I want to create an account"
        checked={isSelected}
        onChange={setSelected}
      />
    </div>
  );
};
