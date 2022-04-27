export const useId = () => {
  return typeof Math !== "undefined" ? Math.random().toString(36) : "0";
};
