import { gql } from "@apollo/client";

export const typeDefs = gql`
  enum Sort {
    asc
    desc
  }

  input MessagesOrderByInput {
    content: Sort
  }

  input MessageInput {
    content: String!
  }

  input ResponseInput {
    content: String!
    messageId: Int!
  }
`;
