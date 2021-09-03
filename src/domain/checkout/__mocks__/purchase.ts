export const MockPurshaseSuccess = {
  purchase: {
    success: true,
    errorMessage: null,
  },
};

export const MockPurshaseInsufficientFunds = {
  purchase: {
    success: false,
    errorMessage: null,
  },
};

export const MockPurshaseOfferExpired = {
  purchase: {
    success: false,
    errorMessage: 'Offer expired',
  },
};

export const MockPurshaseNotHaveMoney = {
  purchase: {
    success: false,
    errorMessage: "You don't have that much money.",
  },
};

export const MocksPurshase: { [key: string]: any } = {
  success: MockPurshaseSuccess,
  insufficientFunds: MockPurshaseInsufficientFunds,
  offerExpired: MockPurshaseOfferExpired,
  youDoNotHaveMoney: MockPurshaseNotHaveMoney,
};
