export const MockPurshaseSuccess = {
  purchase: {
    success: true,
    errorMessage: null,
  },
};

export const MockPurshaseGenericFailure = {
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

export const MocksPurshase = {
  success: MockPurshaseSuccess,
  generic: MockPurshaseGenericFailure,
  offerExpired: MockPurshaseOfferExpired,
  doNotHaveMoney: MockPurshaseNotHaveMoney,
};
