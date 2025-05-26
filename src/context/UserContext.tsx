import type Peer from "peerjs";
import { createContext, useState, type ReactNode } from "react";

interface UserContextType {
  username: string | null;
  peerId:Peer|null
  setUsername: (name: string | null) => void;
  setPeerId: (peer:Peer|null)=>void;
}

export const UserContext = createContext<UserContextType>({
  username: null,
  peerId:null,
  setUsername: () => {},
  setPeerId:()=>{}
});

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string | null>(null);
  const [peerId,setPeerId]=useState<Peer|null>(null);

  return (
    <UserContext.Provider value={{ username,peerId ,setUsername,setPeerId }}>
      {children}
    </UserContext.Provider>
  );
};
