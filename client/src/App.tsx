import { ChatProvider } from "./context/ChatContext";
import ChatApp from "./components/ChatApp";

function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}

export default App;
