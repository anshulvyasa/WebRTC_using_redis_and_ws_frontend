import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

interface Props {
  children: React.ReactNode;
}

interface SocketContextType {
  socket: WebSocket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();
  const { username } = useContext(UserContext);

  useEffect(() => {
    console.log("username : ", username);
    if (!username) {
      if (socket) {
        setSocket(null);
      }
      return;
    }

    const WEB_SERVER_URL = `ws://localhost:8080?userId=${encodeURIComponent(
      username
    )}`;
    const ws = new WebSocket(WEB_SERVER_URL);
    console.log("ws is ", ws);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      console.log("socket.current : ", socket?.readyState);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        console.log("message : ", message);
        switch (message.type) {
          case "room-created":
            if (message.roomId && typeof message.roomId === "string") {
              console.log(
                `Room created, navigating to: /room/${message.roomId}`
              );
              navigate(`/room/${message.roomId}`);
            } else {
              console.warn(
                "Invalid or missing roomId in room-created message:",
                message
              );
            }
            break;
          default:
            console.warn("Unknown message type received:", message);
            break;
        }
      } catch (error) {
        console.error("Error while parsing message");
        console.error(error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error("Error in ws Connection ", error);
    };

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [username]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
