import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="w-[90%] h-screen mx-auto bg-black text-white flex flex-col justify-center items-center">
    <h1 className="text-purple-600 my-10 text-4xl text-center">Lobby! Please join by entering details</h1>
    <form onSubmit={handleSubmitForm} className="flex flex-col bg-green-600 p-3  gap-6 items-start justify-start">
      <div className="flex flex-row w-[100%] items-center justify-between">
        <label htmlFor="email" className="text-2xl w-[30%] ">Email ID</label>
        <input 
          type="email"
          id="email"
          value={email}
          className="p-3 border-2 w-[70%] rounded-xl text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex  flex-row items-center justify-center">
        <label htmlFor="room" className="text-2xl w-[30%]">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          className="p-3 border-2 w-[70%] rounded-xl text-black"
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <button className="px-4 py-2 bg-purple-700 text-center text-2xl text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-400">Join</button>
      </div>
    </form>
  </div>
  
  );
};

export default LobbyScreen;