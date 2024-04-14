import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function useSocket(URL) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketInstance = io(`${URL}`, { transports: ["websocket"] });
    setSocket(socketInstance);
    // return () => {
    //   socketInstance.disconnect();
    //   setSocket(null);
    // };
  }, []);

  return socket;
}
