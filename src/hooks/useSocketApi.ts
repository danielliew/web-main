import { useEffect } from "react";
import socketApi from "../api/socketApi";
import { LoginValues } from "../types";

const useSocketApi = (
  user: LoginValues,
  setClientList: (s: string[]) => void
) => {
  useEffect(() => {
    socketApi.auth = { ...socketApi.auth, user };
    socketApi.connect();

    socketApi.on("client-list", (clientList: string[]) => {
      setClientList(clientList);
    });

    return () => {
      socketApi.disconnect();
    };
  }, []);
};

export default useSocketApi;
