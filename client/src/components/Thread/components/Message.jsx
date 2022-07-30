import { Icon } from "@iconify/react";
import { useMutation } from "@apollo/client";
import {
  LIKE_MESSAGE,
  DISLIKE_MESSAGE,
  GET_MESSAGES,
  CREATE_RESPONSE,
} from "../../../queries";
import { Response } from "./Response";
import { useState } from "react";
import { orderBy } from "../../../constants";
const Message = ({ content, likes, dislike, id, responses }) => {
  const handleLike = () => {
    likeMessage({ variables: { id: Number(id) } });
  };

  const [likeMessage] = useMutation(LIKE_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES, variables: { orderBy } }],
  });

  const handleDislike = () => {
    dislikeMessage({ variables: { id: Number(id) } });
  };

  const [dislikeMessage] = useMutation(DISLIKE_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES, variables: { orderBy } }],
  });
  const [response, setResponse] = useState("");

  const responseHandler = (e) => {
    setResponse(e.target.value);
  };
  const sendResponseHandler = () => {
    createResponse({
      variables: { data: { content: response, messageId: Number(id) } },
    });
  };

  const [createResponse] = useMutation(CREATE_RESPONSE);

  return (
    <div className="message-container">
      <div className="message-response">
        <div className="message-wrapper">
          <span className="message">{content}</span>
        </div>
        <div className="response-controls">
          <input
            className="reply"
            type="text"
            onChange={responseHandler}
            value={response}
          />
          <button className="reply-btn" onClick={sendResponseHandler}>
            Reply
          </button>
        </div>
      </div>
      <div className="message-controls">
        <div className="likes-wrapper">
          <button onClick={handleLike}>
            <Icon icon="ant-design:like-outlined" />
          </button>
          <span className="likes-count">{likes}</span>
          <button onClick={handleDislike}>
            <Icon icon="ant-design:dislike-outlined" />
          </button>
          <span className="dislikes-count">{dislike}</span>
        </div>
      </div>
      <div className="response-container">
        {responses.map((response) => (
          <Response
            key={response.id}
            response={response.content}
            id={response.id}
          />
        ))}
      </div>
    </div>
  );
};

export { Message };
