import { Icon } from "@iconify/react";

const Message = (content) => {
  return (
    <div className="message-container">
      <div className="message-wrapper">
        <span className="message">{content.content}</span>
      </div>
      <div className="message-controls">
        <div className="likes-wrapper">
          <Icon icon="ant-design:like-outlined" />
          <span className="likes-count">0</span>
          <Icon icon="ant-design:dislike-outlined" />
          <span className="dislikes-count">0</span>
        </div>
      </div>
      {/* <Response responses={responses} /> */}
    </div>
  );
};

export { Message };
