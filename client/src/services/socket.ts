import { io } from "socket.io-client";

const backendUrl = import.meta.env.PROD
  ? "http://localhost:3000"
  : "http://backend:3000";

const socket = io(backendUrl, {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

export default socket;
