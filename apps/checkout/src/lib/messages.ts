import { useMessageFormatter } from "@react-aria/i18n";
import { Region } from "./regions";

type Messages = Record<Region, RegionMessages>;

type RegionMessages = Record<
  | "summary"
  | "subtotal"
  | "addDiscount"
  | "shippingCost"
  | "taxCost"
  | "total"
  | "each"
  | "expressCheckout"
  | "otherCheckout"
  | "account"
  | "signOut"
  | "shippingAddress"
  | "billingAddress"
  | "addAddress"
  | "adressNotSupported"
  | "useAsBilling"
  | "cancel"
  | "saveAddress"
  | "otherCountriesNotSupported",
  string
>;

const messages: Messages = {
  "en-US": {
    summary: "Summary & review",
    subtotal: "Subtotal",
    addDiscount: "Add gift card or discount code",
    shippingCost: "Shipping",
    taxCost: "Sales tax",
    total: "Total",
    each: "each",
    expressCheckout: "Express Checkout",
    otherCheckout: "Or proceed with the form below",
    account: "Account",
    signOut: "Sign Out",
    shippingAddress: "Shipping address",
    billingAddress: "Billing address",
    addAddress: "Add address",
    saveAddress: "Save address",
    adressNotSupported: "We do not support shipment to this address",
    otherCountriesNotSupported: "We do not support shipment to other countries",
    useAsBilling: "Use as billing address",
    cancel: "Cancel",
  },
  "pl-PL": {
    summary: "Podsumowanie",
    subtotal: "Cena produktów",
    addDiscount: "Dodaj kartę podarunkową lub talon",
    shippingCost: "Wysyłka",
    taxCost: "Podatek od sprzedaży",
    total: "Łączna kwota do zapłaty",
    each: "za sztukę",
    expressCheckout: "Zakup Ekspresowy",
    otherCheckout: "Lub wypełnij formularz poniżej",
    account: "Konto",
    signOut: "Wyloguj się",
    shippingAddress: "Adres wysyłki",
    billingAddress: "Adres rozliczeniowy",
    addAddress: "Dodaj adres",
    saveAddress: "Zapisz adres",
    adressNotSupported: "Nie wspieramy wysyłki na ten adres",
    otherCountriesNotSupported: "Nie wspieramy wysyłki do innych krajów",
    useAsBilling: "Użyj jako adresu rozliczeniowego",
    cancel: "Anuluj",
  },
};

export const useFormattedMessages = () => {
  const formatMessage = useMessageFormatter(messages);

  return (
    messageKey: keyof RegionMessages,
    values?: Record<string, string | number>
  ) => formatMessage(messageKey, values);
};
