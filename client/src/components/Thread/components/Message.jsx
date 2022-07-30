import { Icon } from "@iconify/react";
import { useMutation } from "@apollo/client";
import { LIKE_MESSAGE, DISLIKE_MESSAGE, GET_MESSAGES } from "../../../queries";
// import { orderBy } from "../../../constants";
const Message = ({ content, likes, dislike, id }) => {
  const handleLike = () => {
    likeMessage({ variables: { id: Number(id) } });
  };

  const [likeMessage] = useMutation(LIKE_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES }],
  });

  const handleDislike = () => {
    dislikeMessage({ variables: { id: Number(id) } });
  };

  const [dislikeMessage] = useMutation(DISLIKE_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES }],
  });

  return (
    <div className="message-container">
      <div className="message-wrapper">
        <span className="message">{content}</span>
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
      {/* <Response responses={responses} /> */}
    </div>
  );
};

export { Message };
