import { React, useState } from "react";
import { useMutation } from "@apollo/client";
import "./styles.css";
import { GET_MESSAGES, CREATE_MESSAGE } from "../../queries";
import { orderBy } from "../../constants";
const AddMessage = () => {
  const [messageText, setMessageText] = useState("");

  const changeHandler = (e) => {
    setMessageText(e.target.value);
  };

  const [sendMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES, variables: { orderBy } }],
  });

  const handleSendMessage = () => {
    console.log(messageText);
    sendMessage({
      variables: {
        content: { messageText },
      },
    });
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
          value={messageText}
          onChange={changeHandler}
        ></textarea>
        <button
          type="button"
          className="send-message-btn"
          value={messageText}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
};

export { AddMessage };
