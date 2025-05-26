import type React from "react";
import { useContext, useRef, useState } from "react";
import DisplayErrorMessage from "./DisplayError";
import { v4 as UUIDv4 } from "uuid";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import Peer from "peerjs";

const CreateRoomComponent: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);
  const { setUsername, setPeerId } = useContext(UserContext);
  const socketRef = useRef<WebSocket | null>(null);
  socketRef.current = socket;

  const handleCreateRoom = async () => {
    const username = userRef.current?.value;
    if (!username) {
      setErrorMessage("Please enter a username.");
      return;
    }

    if (username.length < 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    const userId = `${username}-${UUIDv4().slice(0, 8)}`;
    const peer = new Peer(userId);
    setUsername(userId);
    setPeerId(peer);

    try {
      await new Promise<void>((resolve, reject) => {
        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
          resolve();
        } else {
          const interval = setInterval(() => {
            if (
              socketRef.current &&
              socketRef.current.readyState === WebSocket.OPEN
            ) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
          setTimeout(() => {
            clearInterval(interval);
            reject(new Error("WebSocket Connection Timeout"));
          }, 5000);
        }
      });

      socketRef.current?.send(JSON.stringify({ type: "create-room" }));
    } catch (error: any) {
      setErrorMessage(
        error.message === "WebSocket Connection Timeout"
          ? "WebSocket Connection Timeout"
          : "Failed to connect to server. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card w-96 bg-base-100 border backdrop-blur-2xl border-gray-700">
      <div className="card-body">
        <h1 className="card-title mb-2">Create a New Room</h1>
        <input
          ref={userRef}
          className="input w-full"
          placeholder="Enter Your UserName"
          type="text"
          disabled={isLoading}
        />
        {errorMessage && <DisplayErrorMessage message={errorMessage} />}
        <button
          className="btn btn-primary"
          onClick={handleCreateRoom}
          disabled={isLoading}
        >
          {isLoading ? "Creating Room..." : "Create Room"}
        </button>
      </div>
    </div>
  );
};

export default CreateRoomComponent;
