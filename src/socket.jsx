import { io } from "socket.io-client";

const URL = import.meta.env.VITE_APP_URL_SOCKET;

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export const connectSocket = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  if (!token || !userId) return;

  // prevent calling connect multiple times
  if (socket.connected) return;

  socket.auth = { token, userId };
  socket.connect();
};

socket.on("connect_error", (err) => {
  console.log("socket connect_error:", err.message);
});

socket.on("reconnect_attempt", () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  socket.auth = { token, userId };
});

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
