import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import "./styles.css";
import { CREATE_MESSAGE, GET_MESSAGES } from "../../queries";
import { orderBy } from "../../constants";
// import { orderBy } from "../../constants";
const AddMessage = () => {
  const [content, setMessageText] = useState("");

  const changeHandler = (e) => {
    setMessageText(e.target.value);
  };

  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES, variables: { orderBy } }],
  });

  const handleSendMessage = () => {
    createMessage({ variables: { data: { content } } });
  };
  let status = "";
  if (loading) status = "Submitting...";
  if (error) status = `Submission error! ${error.message}`;

  return (
    <>
      <div>{status}</div>
      <div className="create-message-wrapper">
        <textarea
          className="text-input"
          type="text"
          placeholder="Enter Your Message Here..."
          value={content}
          onChange={changeHandler}
        ></textarea>
        <button
          type="button"
          className="send-message-btn"
          value={content}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
};

export { AddMessage };
