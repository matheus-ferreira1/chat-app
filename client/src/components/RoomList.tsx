import React, { useEffect, useState } from "react";

import socket from "../services/socket";
import axios from "../services/axios";
import { useChat } from "@/context/ChatContext";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const RoomList: React.FC = () => {
  const { username, setCurrentRoom } = useChat();

  const [rooms, setRooms] = useState<string[]>([]);
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    socket.emit("getRooms");
    socket.on("rooms", (data) => {
      setRooms(data.map((room: { name: string }) => room.name));
    });

    return () => {
      socket.off("rooms");
    };
  }, []);

  const handleCreateRoom = async () => {
    try {
      await axios.post("/rooms", { name: newRoom });
      socket.emit("getRooms");
      setNewRoom("");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = (room: string) => {
    socket.emit("joinRoom", room);
    setCurrentRoom(room);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome, {username}!
      </h2>
      <h3 className="text-2xl font-semibold mb-4">Available Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length >= 1 ? (
          rooms.map((room) => (
            <Card
              key={room}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle>{room}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => handleJoinRoom(room)} className="w-full">
                  Join Room
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Create a New Room</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="New room name"
            className="flex-grow"
          />
          <Button onClick={handleCreateRoom} type="submit">
            Create Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
