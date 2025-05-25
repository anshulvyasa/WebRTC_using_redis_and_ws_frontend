import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useRef, useState } from "react";
import DisplayErrorMessage from "./DisplayError";

const CreateRoomComponent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateRoom = () => {
    const value = inputRef.current?.value;
    if (!value) {
      setErrorMessage("Please enter your username.");
      return;
    }

    if (value.length <= 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      return;
    }

    console.log("value is ", value);
  };

  return (
    <div className="card w-96 bg-base-100 border backdrop-blur-2xl border-gray-700">
      <div className="card-body">
        <h1 className="card-title mb-2">Create a New Room</h1>
        <input
          ref={inputRef}
          className="input w-full"
          placeholder="Enter Your UserName"
          type="text"
        />
        <AnimatePresence>
          {errorMessage && <DisplayErrorMessage message={errorMessage} />}
        </AnimatePresence>
        <button className="btn btn-primary" onClick={handleCreateRoom}>
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoomComponent;
