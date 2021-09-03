import { gql } from '@apollo/client';

export const WalletQueries = {
  viewer: gql`
    {
      viewer {
        id
        name
        balance
        offers {
          id
          price
          product {
            id
            name
            description
            image
          }
        }
      }
    }
  `,
};
