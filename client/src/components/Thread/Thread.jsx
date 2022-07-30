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

        const { newMessage } = subscriptionData.data;
        console.log(subscriptionData.data);
        return {
          ...prev,
          messagess: {
            ...prev.messages,
            productList: [
              { ...newMessage, responses: [] },
              ...prev.products.productList,
            ],
          },
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) return <div className="messages-wrapper"> Loading messages</div>;
  if (error)
    return (
      <div className="messages-wrapper"> Error loading :{error.message}</div>
    );
  console.log(data);
  return (
    <div className="messages-wrapper">
      {data.messages.messageList.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          likes={message.likes}
          dislike={message.dislike}
          content={message.content}
        />
      ))}
    </div>
  );
};
export { Thread };
