import {
  useCheckoutBillingAddressUpdateMutation,
  useCheckoutShippingAddressUpdateMutation,
} from "@/graphql";
import { extractMutationErrors, getDataWithToken } from "@/lib/utils";
import { ApiErrors, Errors } from "@/providers/ErrorsProvider";
import { useState } from "react";
import { AddressFormData } from "./types";
import { getAddressInputData } from "./utils";

export const useCheckoutAddressUpdate = ({
  useShippingAsBillingAddress,
}: {
  useShippingAsBillingAddress: boolean;
}) => {
  const [shippingAddressUpdateErrors, setShippingAddressUpdateErrors] =
    useState<ApiErrors>([]);

  const [billingAddressUpdateErrors, setBillingAddressUpdateErrors] =
    useState<ApiErrors>([]);

  const [, checkoutShippingAddressUpdate] =
    useCheckoutShippingAddressUpdateMutation();

  const updateShippingAddress = async (address: AddressFormData) => {
    const result = await checkoutShippingAddressUpdate(
      getDataWithToken({ shippingAddress: getAddressInputData(address) })
    );

    const [hasErrors, errors] = extractMutationErrors(result);

    if (hasErrors) {
      setShippingAddressUpdateErrors(errors);
      return;
    }

    if (useShippingAsBillingAddress) {
      updateBillingAddress(address);
    }
  };

  const [, checkoutBillingAddressUpdate] =
    useCheckoutBillingAddressUpdateMutation();

  const updateBillingAddress = async (address: AddressFormData) => {
    const result = await checkoutBillingAddressUpdate(
      getDataWithToken({ billingAddress: getAddressInputData(address) })
    );

    const [hasErrors, errors] = extractMutationErrors(result);

    if (hasErrors) {
      setBillingAddressUpdateErrors(errors);
    }
  };

  return {
    updateShippingAddress,
    updateBillingAddress,
    shippingAddressUpdateErrors,
    billingAddressUpdateErrors,
  };
};
