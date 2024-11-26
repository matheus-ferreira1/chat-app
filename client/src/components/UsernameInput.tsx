import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface UsernameInputProps {
  setUsername: (username: string) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ setUsername }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("usernameSet", (uniqueUsername: string) => {
      setUsername(uniqueUsername);
    });

    return () => {
      socket.off("usernameSet");
    };
  }, [setUsername]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("setUsername", input, (uniqueUsername: string) => {
      setUsername(uniqueUsername);
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to ChatApp
        </h2>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 mb-4 text-lg"
          placeholder="Enter your username"
          required
        />
        <Button type="submit" className="w-full p-3 text-lg font-semibold">
          Join
        </Button>
      </form>
    </div>
  );
};

export default UsernameInput;
