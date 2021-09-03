/* eslint-disable no-undef */
jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual('@react-navigation/core'),
  useRoute: jest.fn((...args) => {
    try {
      const route = jest
        .requireActual('@react-navigation/core')
        .useRoute(...args);
      if (!route) {
        throw new Error();
      }
      return route;
    } catch (_e) {
      return { params: {} };
    }
  }),
}));
