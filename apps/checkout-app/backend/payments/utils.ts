export const parseAmountToString = (amount: number, negative = false) => {
  const value = amount.toFixed(2).toString();

  return negative ? "-" + value : value;
};
