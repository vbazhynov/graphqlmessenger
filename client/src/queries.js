import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query getMessages($orderBy: MessagesOrderByInput!) {
    messages(orderBy: $orderBy) {
      messageList {
        id
        content
        likes
        dislike
        createdAt
        responses {
          id
          content
        }
      }
      count
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($data: MessageInput!) {
    createMessage(data: $data) {
      content
    }
  }
`;

export const CREATE_RESPONSE = gql`
  mutation createResponse($review: ResponseInput!) {
    createResponse(review: $review) {
      id
      text
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id
      price
      title
    }
  }
`;
