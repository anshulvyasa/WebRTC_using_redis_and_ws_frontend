import type React from "react";
import CreateRoomComponent from "../component/CreateRoomComponent";

const CreateRoom: React.FC = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <CreateRoomComponent />
    </div>
  );
};

export default CreateRoom;
