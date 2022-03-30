import { Checkbox } from "@components/Checkbox";
import { useUserQuery } from "@graphql";
import { useToggleState } from "@react-stately/toggle";
import { useAuthState } from "@saleor/sdk";
import { UserShippingAddress } from "./UserShippingAddress";
import { UserBillingAddress } from "./UserBillingAddress";

interface UserAddressesProps {}

export const UserAddresses: React.FC<UserAddressesProps> = ({}) => {
  const { user: authUser } = useAuthState();
  const {
    isSelected: useShippingAsBillingAddress,
    setSelected: setUseShippingAsBillingAddressSelected,
  } = useToggleState({ defaultSelected: true });

  const [{ data }] = useUserQuery({
    pause: !authUser?.id,
    variables: { id: authUser?.id as string },
  });
  const user = data?.user;
  const addresses = user?.addresses;

  return (
    <div>
      <UserShippingAddress
        addresses={addresses}
        defaultAddress={user?.defaultShippingAddress}
      />
      <Checkbox
        value="useShippingAsBilling"
        checked={useShippingAsBillingAddress}
        onChange={setUseShippingAsBillingAddressSelected}
        label="use shipping address as billing address"
      />
      {!useShippingAsBillingAddress && (
        <UserBillingAddress
          addresses={addresses}
          defaultAddress={user?.defaultBillingAddress}
        />
      )}
    </div>
  );
};
