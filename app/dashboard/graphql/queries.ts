import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      date
      description
      category {
        id
        name
        type
      }
      account {
        id
        name
        currency
      }
    }
  }
`; 