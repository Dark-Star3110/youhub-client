export const getNumToString = (value?: number): string => {
  if (!value) return "0";
  else if (value < 1000) return `${value}`;
  else if (value < 1000000)
    return `${parseFloat(`${value / 1000}`).toFixed(2)}N`;
  else return `${parseFloat(`${value / 1000000}`).toFixed(2)}M`;
};
