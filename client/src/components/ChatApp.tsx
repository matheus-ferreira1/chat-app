import { useChat } from "@/context/ChatContext";

import UsernameInput from "./UsernameInput";
import Chat from "./Chat";
import RoomList from "./RoomList";

function ChatApp() {
  const { username, currentRoom } = useChat();

  if (!username) {
    return <UsernameInput />;
  }

  return <div>{currentRoom ? <Chat /> : <RoomList />}</div>;
}
export default ChatApp;
