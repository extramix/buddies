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

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name

    }
  }
`;

export const GET_CATEGORIES = gql`
query GetCategories {
  categories {
    income {
      id
      name
    }
    expense {
      id
      name
    }
  }
}`

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $accountId: ID!
    $amount: Float!
    $categoryId: ID!
    $date: Date!
    $description: String!
  ) {
    createTransaction(
      accountId: $accountId
      amount: $amount
      categoryId: $categoryId
      date: $date
      description: $description
    ) {
      transaction {
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
  }
`;