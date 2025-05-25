import type React from "react";
import Options from "../component/Option";
import { useState } from "react";


const Home: React.FC = () => {
   
  const [display,setDisplay]=useState<number>(3);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      {display==3&&<Options />}
   
    </div>
  );
};

export default Home;
