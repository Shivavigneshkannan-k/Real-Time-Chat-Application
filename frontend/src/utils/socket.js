import { createContext,useContext } from "react";
import { BASE_URL } from "./constants";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const socket = io(BASE_URL,{autoConnect:false})

export const useSocketContext = ()=>{
    const socketIO = useContext(SocketContext);
    if(!socketIO){
        throw new Error("useSocketContext must be used within a SocketProvider");
    }
    return socketIO;
}
