import { ReactNode } from "react";
import { Text } from "@/components/Text";
import { useOrder } from "@/hooks/useOrder";
import {
  AddressFragment,
  OrderFragment,
  PaymentChargeStatusEnum,
  ShippingFragment,
} from "@/graphql";

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Text size="lg" weight="bold" className="mb-2">
    {children}
  </Text>
);

const Section = ({ children }: { children: ReactNode }) => (
  <div className="mb-6">{children}</div>
);

const PaymentSection = ({
  isPaid,
  paymentStatus,
}: {
  isPaid: boolean;
  paymentStatus: PaymentChargeStatusEnum;
}) => {
  const renderPaymentDetails = () => {
    if (["CANCELLED", "NOT_CHARGED", "REFUSED"].includes(paymentStatus)) {
      return (
        <>
          <Text color="success">We've received your payment</Text>
          <Text color="secondary">Paid with credit card</Text>
        </>
      );
    }

    if (isPaid || ["FULLY_CHARGED", "PENDING"].includes(paymentStatus)) {
      return (
        <>
          <Text color="success">We've received your payment</Text>
          <Text color="secondary">Paid with credit card</Text>
        </>
      );
    }

    // TODO: Add support for partial payments

    return null;
  };

  return (
    <Section>
      <SectionTitle>Payment</SectionTitle>
      <div>{renderPaymentDetails()}</div>
    </Section>
  );
};

const Address = ({ address }: { address: AddressFragment }) => {
  return (
    <div>
      <Text color="secondary">
        {address.firstName} {address.lastName}
      </Text>
      <Text color="secondary">{address.streetAddress1}</Text>
      {address.streetAddress2 && (
        <Text color="secondary">{address.streetAddress2}</Text>
      )}
      <Text color="secondary">
        {address.postalCode} {address.city}, {address.country.country}
      </Text>
    </div>
  );
};

const isShipping = (
  deliveryMethod: OrderFragment["deliveryMethod"]
): deliveryMethod is ShippingFragment =>
  deliveryMethod?.__typename === "ShippingMethod";

const DeliverySection = ({
  deliveryMethod,
}: {
  deliveryMethod: OrderFragment["deliveryMethod"];
}) => {
  if (!isShipping(deliveryMethod)) {
    return null;
  }

  const deliveryDaysText = [
    deliveryMethod.minimumDeliveryDays,
    deliveryMethod.maximumDeliveryDays,
  ]
    .filter(Boolean)
    .join(" - ");

  return (
    <Section>
      <SectionTitle>Shipping method</SectionTitle>
      <div>
        <Text color="secondary">{deliveryMethod.name}</Text>
        {deliveryDaysText && (
          <Text color="secondary">{deliveryDaysText} business days</Text>
        )}
      </div>
    </Section>
  );
};

export const OrderDataSummary = () => {
  const { order } = useOrder();

  return (
    <section className="flex-grow">
      <PaymentSection />
      <DeliverySection deliveryMethod={order.deliveryMethod} />
      <Section>
        <SectionTitle>Shipping address</SectionTitle>
        <Address address={order.shippingAddress!} />
      </Section>
      <Section>
        <SectionTitle>Billing address</SectionTitle>
        <Address address={order.billingAddress!} />
      </Section>
    </section>
  );
};
