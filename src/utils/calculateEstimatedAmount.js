// utils/conversionUtils.js
export const calculateEstimatedAmount = (
  fromToken,
  toToken,
  amount,
  prices
) => {
  if (prices[fromToken] && prices[toToken]) {
    const fromPrice = prices[fromToken].usd;
    const toPrice = prices[toToken].usd;
    const conversionRate = fromPrice / toPrice;
    return (amount * conversionRate).toFixed(8);
  }
  return 0; // Default value if conversion cannot be calculated
};
