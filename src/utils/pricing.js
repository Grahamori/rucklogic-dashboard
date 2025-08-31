import platformFees from "../platformFees";

export const calculateSuggestedPrice = (cost, platform, marginMultiplier = 1.5) => {
  const fees = platformFees[platform];
  const processingFee = cost * (fees.processingFeePercent / 100) + fees.fixedFee;
  const buyerFee = cost * (fees.buyerFeePercent / 100) + fees.buyerFixedFee;
  const totalFees = processingFee + buyerFee;
  return parseFloat((cost + totalFees) * marginMultiplier).toFixed(2);
};

