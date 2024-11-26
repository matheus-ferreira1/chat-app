import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const Teste = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Receber lista de salas ao definir o username
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });

    // Receber mensagens em tempo real
    socket.on("message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("rooms");
      socket.off("message");
    };
  }, []);

  const handleLogin = () => {
    socket.emit("setUsername", username);
    setIsLoggedIn(true);
  };

  const joinRoom = (room: string) => {
    setCurrentRoom(room);
    setMessages([]); // Limpar mensagens anteriores
    socket.emit("joinRoom", room);
  };

  const sendMessage = () => {
    if (message.trim() && currentRoom) {
      socket.emit("sendMessage", { room: currentRoom, message });
      setMessage("");
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Enter Chat</h1>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleLogin}>Join Chat</Button>
      </div>
    );
  }

  return (
    <div>
      {!currentRoom ? (
        <div>
          <h1>Available Rooms</h1>
          <ul>
            {rooms.map((room) => (
              <li key={room}>
                <Button onClick={() => joinRoom(room)}>{room}</Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Room: {currentRoom}</h1>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.user}: </strong>
                {msg.text}
              </div>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      )}
    </div>
  );
};

export default Teste;
