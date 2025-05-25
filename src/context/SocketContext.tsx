import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

interface SocketContextType {
  socket: WebSocket | null;
}
export const WS_Server = "ws://localhost:8080";
export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket(WS_Server);
    socketRef.current = ws;
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const messageHandler = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "room-created") {
          navigate(`/room/${message.roomId}`);
        }
      } catch (error) {
        console.error("Error parsing message from server:", error);
      }
    };

    socket.addEventListener("message", messageHandler);

    return () => {
      socket.removeEventListener("message", messageHandler);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
