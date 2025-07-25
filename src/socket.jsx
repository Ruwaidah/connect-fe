import { io } from "socket.io-client";

// const URL = import.meta.env.VITE_APP_URL;
const URL = "https://hashtagserver.onrender.com"

export const socket = io(URL, {
  autoConnect: true,
});
