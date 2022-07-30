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

export const LIKE_MESSAGE = gql`
  mutation likeMessage($id: Int!) {
    likeMessage(id: $id) {
      likes
    }
  }
`;

export const DISLIKE_MESSAGE = gql`
  mutation dislikeMessage($id: Int!) {
    dislikeMessage(id: $id) {
      dislike
    }
  }
`;

export const CREATE_RESPONSE = gql`
  mutation createResponse($data: ResponseInput!) {
    createResponse(data: $data) {
      id
      content
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
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
  }
`;
