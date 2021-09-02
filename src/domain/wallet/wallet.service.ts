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

export const WalletMutation = {
  purchase: gql`
    mutation Purchase($offerId: ID!) {
      purchase(offerId: $offerId)
    }
  `,
};
