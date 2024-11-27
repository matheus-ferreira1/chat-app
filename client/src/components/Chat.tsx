import React, { useEffect, useState } from "react";

import socket from "../services/socket";
import { useChat } from "@/context/ChatContext";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface IMessage {
  user: string;
  text: string;
}

const Chat: React.FC = () => {
  const { username, currentRoom, setCurrentRoom } = useChat();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", currentRoom);
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [currentRoom]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const messageToSend: IMessage = {
      user: username!,
      text: input,
    };

    socket.emit("newMessage", {
      roomName: currentRoom,
      message: messageToSend,
    });
    setInput("");
  };

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", currentRoom);
    setCurrentRoom(null);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{currentRoom}</span>
            <Button onClick={handleLeaveRoom} variant="outline">
              Leave Room
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.user === username ? "text-right" : ""}`}
            >
              {msg.user === "System" ? (
                ""
              ) : (
                <span className="font-bold">{msg.user}: </span>
              )}
              {/* <span className="font-bold">{msg.user}: </span> */}
              {msg.text}
            </div>
          ))}
        </CardContent>
      </Card>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default Chat;
