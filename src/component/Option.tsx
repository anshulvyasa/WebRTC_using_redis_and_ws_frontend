import { useNavigate } from "react-router-dom";

const Options = () => {
const navigate=useNavigate();

  return (
    <div className="card w-96 bg-base-100 border backdrop-blur-2xl border-gray-700">
      <div className="card-body">
        <h2 className="card-title mb-2 ">
          Select One of The Following Options
        </h2>
        <div className="card-actions">
          <button className="btn btn-primary w-full" onClick={()=>navigate('/create-room')}>Create a New Room</button>
          <button className="btn btn-primary w-full" onClick={()=>navigate('/join-room')}>
            Join a Existing Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Options;
