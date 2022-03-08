import { useFormattedMessages } from "@hooks/useFormattedMessages";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import { Checkbox } from "@components/Checkbox";
import { useToggleState } from "@react-stately/toggle";
import { useForm } from "react-hook-form";

export const Contact = () => {
  const formatMessage = useFormattedMessages();
  const { register, handleSubmit, watch, control } = useForm({});

  const {
    isSelected: createAccountSelected,
    setSelected: setCreateAccountSelected,
  } = useToggleState();

  const onSubmit = (data) => console.log({ ...data });

  console.log("WATCHEN", watch("email"));

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between items-baseline">
          <Text variant="title">{formatMessage("contact")}</Text>
          <div className="flex flex-row">
            <Text color="secondary" className="mr-2">
              {formatMessage("haveAccount")}
            </Text>
            <Button variant="tertiary" title={formatMessage("signIn")} />
          </div>
        </div>
        <TextInput
          label="Email address"
          className="my-4"
          control={control}
          {...register("email")}
        />
        <Checkbox
          value="createAccount"
          label="I want to create an account"
          checked={createAccountSelected}
          onChange={setCreateAccountSelected}
        />
        {createAccountSelected && (
          <TextInput
            label="Password"
            className="my-4"
            control={control}
            type="password"
            {...register("password")}
          />
        )}
        {/* <button type="submit">CLICK ME MAN, PLZ CLICK</button> */}
      </form>
    </div>
  );
};
