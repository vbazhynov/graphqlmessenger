import "./App.css";
import { AddMessage } from "./components/AddMessage/AddMessage";
import { Thread } from "./components/Thread/Thread";

function App() {
  return (
    <div className="container">
      <AddMessage />
      <Thread />
    </div>
  );
}

export default App;
