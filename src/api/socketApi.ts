import { io } from "socket.io-client";
import { socketDevelopmentUrl, socketProductionUrl } from "./api.routes";

const socketApi = io(
  process.env.NODE_ENV === "production"
    ? socketProductionUrl
    : socketDevelopmentUrl,
  {
    autoConnect: false,
  }
);

socketApi.on("connect", () => console.log("Connected to socketApi"));
socketApi.on("connect_error", () => console.error("socketApi connect error"));
socketApi.on("disconnect", () => console.log("Disconnected from socketApi"));

export default socketApi;
