import { WalletHistory } from '../types';

export const MockWalletHistory: WalletHistory[] = [
  {
    id: 'history-1',
    quantity: 1,
    total: 5000,
    offer: {
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
    createdAt: '2021-09-02T02:58:31.296Z',
  },
  {
    id: 'history-2',
    quantity: 1,
    total: 5507,
    offer: {
      id: 'offer/microverse-battery',
      price: 5507,
      product: {
        id: 'product/microverse-battery',
        name: 'Microverse Battery',
        description:
          'The Microverse Battery contains a miniature universe with a planet inhabited by intelligent life.',
        image:
          'https://vignette.wikia.nocookie.net/rickandmorty/images/8/86/Microverse_Battery.png/revision/latest/scale-to-width-down/310?cb=20160910010946',
      },
    },
    createdAt: '2021-08-02T09:58:31.296Z',
  },
];
