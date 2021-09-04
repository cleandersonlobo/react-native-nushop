import { Customer } from '../types';

export const MockUser: Customer = {
  id: 'cccc3f48-dd2c-43ba-b8de-8945e7ababab',
  name: 'Jerry Smith',
  balance: 1000000,
};

export const MockViewerAPI = {
  viewer: {
    ...MockUser,
    offers: [
      {
        id: 'offer/portal-gun',
        price: 5000,
        product: {
          id: 'product/portal-gun',
          name: 'Portal Gun',
          description:
            'The Portal Gun is a gadget that allows the user(s) to travel between different universes/dimensions/realities.',
          image:
            'https://vignette.wikia.nocookie.net/rickandmorty/images/5/55/Portal_gun.png/revision/latest/scale-to-width-down/310?cb=20140509065310',
        },
      },
    ],
  },
};
