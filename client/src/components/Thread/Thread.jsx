import { useQuery } from "@apollo/client";
import { Message } from "./components/Message";
import "./styles.css";
import { orderBy } from "../../constants";
import { GET_MESSAGES, NEW_MESSAGE } from "../../queries";
import { useEffect } from "react";
const Thread = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: { orderBy },
  });

  useEffect(() => {
    subscribeToMore({
      document: NEW_MESSAGE,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        console.log(prev);
        const { newMessage } = subscriptionData.data;
        const mes = {
          ...prev,
          messages: {
            ...prev.messages,
            messageList: [
              { ...newMessage, responses: [] },
              ...prev.messages.messageList,
            ],
          },
        };
        console.log(mes);
        return mes;
      },
    });
  }, [subscribeToMore]);

  if (loading) return <div className="messages-wrapper"> Loading messages</div>;
  if (error)
    return (
      <div className="messages-wrapper"> Error loading :{error.message}</div>
    );
  return (
    <div className="messages-wrapper">
      {data.messages.messageList.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          likes={message.likes}
          dislike={message.dislike}
          content={message.content}
          responses={message.responses}
        />
      ))}
    </div>
  );
};
export { Thread };
