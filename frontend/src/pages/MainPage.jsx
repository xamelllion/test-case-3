import "./App.css";
import React, { useState, useEffect } from "react";
import RoomHeader from "../components/RoomHeader";
import ManageBlock from "../components/ManageBlock";
import RoomList from "../components/RoomList";
import RoomElement from "../components/RoomElement";
import fetchRoomList from "../utils/fetchRoomList";


const MainPage = () => {

  let [data, setData] = useState([]);
  useEffect(() => {
    fetchRoomList(setData, []);
  }, []);

  const room_list = data.map((room) => (
    <RoomElement data={room} key={room.id} />
  ));



  return (
    <div className="App">
      <RoomHeader />
      <ManageBlock setData={setData} />
      <RoomList room_list={room_list} />
    </div>
  );
};

export default MainPage;
