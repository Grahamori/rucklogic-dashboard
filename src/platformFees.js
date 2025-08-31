const platformFees = {
  // UK
  eBay_UK:       { processingFeePercent: 0,    fixedFee: 0,    buyerFeePercent: 4,  buyerFixedFee: 0.75 },
  Depop_UK:      { processingFeePercent: 2.9,  fixedFee: 0.30, buyerFeePercent: 5,  buyerFixedFee: 1.00 },
  Vinted_UK:     { processingFeePercent: 0,    fixedFee: 0,    buyerFeePercent: 6,  buyerFixedFee: 0.80 },

  // US
  eBay_US:       { processingFeePercent: 12.9, fixedFee: 0.30, buyerFeePercent: 0,  buyerFixedFee: 0 },
  Depop_US:      { processingFeePercent: 2.9,  fixedFee: 0.30, buyerFeePercent: 10, buyerFixedFee: 0 },
  Vinted_US:     { processingFeePercent: 0,    fixedFee: 0,    buyerFeePercent: 8,  buyerFixedFee: 0.80 },

  // France
  eBay_FR:       { processingFeePercent: 12.8, fixedFee: 0.30, buyerFeePercent: 0,  buyerFixedFee: 0 },
  Depop_FR:      { processingFeePercent: 2.9,  fixedFee: 0.30, buyerFeePercent: 6,  buyerFixedFee: 1.00 },
  Vinted_FR:     { processingFeePercent: 0,    fixedFee: 0,    buyerFeePercent: 7,  buyerFixedFee: 0.80 },

  // Germany
  eBay_DE:       { processingFeePercent: 12.8, fixedFee: 0.30, buyerFeePercent: 0,  buyerFixedFee: 0 },
  Depop_DE:      { processingFeePercent: 2.9,  fixedFee: 0.30, buyerFeePercent: 6,  buyerFixedFee: 1.00 },
  Vinted_DE:     { processingFeePercent: 0,    fixedFee: 0,    buyerFeePercent: 6,  buyerFixedFee: 0.80 },

  // Spain
  eBay_ES:       { processingFeePercent: 12.8, fixedFee: 0.30, buyerFeePercent: 0,  buyerFixedFee: 0 },
  Depop_ES:      { processingFeePercent: 2.9,  fixedFee: 0.30, buyerFeePercent: 6,  buyerFixedFee: 1.00 },
  Vinted_ES:     { processingFeePercent: 0,    fixedFee: 0,    buyerFeePercent: 7,  buyerFixedFee: 0.80 }
};

export default platformFees;
