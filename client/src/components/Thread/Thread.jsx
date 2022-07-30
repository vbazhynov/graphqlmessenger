import { useQuery } from "@apollo/client";
import { Message } from "./components/Message";
import "./styles.css";
import { orderBy } from "../../constants";
import { GET_MESSAGES } from "../../queries";
const Thread = () => {
  // const messages = useQuery();
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { orderBy },
  });
  if (loading) return <div className="messages-wrapper"> Loading messages</div>;
  if (error)
    return (
      <div className="messages-wrapper"> Error loading :{error.message}</div>
    );
  console.log(data);
  return (
    <div className="messages-wrapper">
      {data.messages.messageList.map((message) => (
        <Message key={message.id} content={message.content} />
      ))}
    </div>
  );
};
export { Thread };
