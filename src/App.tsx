import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<Room />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/join-room" element={<JoinRoom />} />
    </Routes>
  );
}

export default App;
