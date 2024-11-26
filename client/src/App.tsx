import { useState } from "react";

import Chat from "./components/Chat";
import RoomList from "./components/RoomList";
import UsernameInput from "./components/UsernameInput";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  if (!username) {
    return <UsernameInput setUsername={setUsername} />;
  }

  return (
    <div>
      {currentRoom ? (
        <Chat
          username={username}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
        />
      ) : (
        <RoomList username={username} setCurrentRoom={setCurrentRoom} />
      )}
    </div>
  );
}

export default App;
