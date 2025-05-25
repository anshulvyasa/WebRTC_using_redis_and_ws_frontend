import type React from "react";
import { useRef, useState } from "react";
import DisplayErrorMessage from "./DisplayError";

const JoinRoomComponent: React.FC = () => {
  const roomRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const [errorMessageRoom, setErrorMessageRoom] = useState<string | null>(null);
  const [errorMessageUser, setErrorMessageUser] = useState<string | null>(null);

  const handleJoinRoom = () => {
    const roomId = roomRef.current?.value;
    const username = userRef.current?.value;

    if (!roomId) {
      setErrorMessageRoom("Please enter your roomId");
      return;
    }

    setErrorMessageRoom(null);

    if (!username) {
      setErrorMessageUser("Please enter your username");
      return;
    }

    console.log("RoomID is ", roomId);
    console.log("UserId is ", username);
  };

  return (
    <div className="card w-96 bg-base-100 border backdrop-blur-2xl border-gray-700">
      <div className="card-body">
        <h1 className="card-title mb-2">Join the Room</h1>
        <input
          ref={roomRef}
          className="input w-full"
          placeholder="Enter Your RoomID"
          type="text"
        />
        {errorMessageRoom && <DisplayErrorMessage message={errorMessageRoom} />}
        <input
          ref={userRef}
          className="input w-full"
          placeholder="Enter Your UserName"
          type="text"
        />
        {errorMessageUser && <DisplayErrorMessage message={errorMessageUser} />}
        <button className="btn btn-primary" onClick={handleJoinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomComponent;
