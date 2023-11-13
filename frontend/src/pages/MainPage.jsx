import "./App.css";
import React, { useState, useEffect } from "react";
import RoomHeader from "../components/RoomHeader";
import ManageBlock from "../components/ManageBlock";
import RoomList from "../components/RoomList";
import RoomElement from "../components/RoomElement";
import fetchRoomList from "../utils/fetchRoomList";
import { DateTimeContext } from "../utils/context";

const MainPage = () => {

  let [data, setData] = useState([]);
  useEffect(() => {
    fetchRoomList(setData, []);
  }, []);

  const room_list = data.map((room) => (
    <RoomElement data={room} key={room.id} />
  ));

  let [date, setDate] = useState(null);

  return (
    <div className="App">
      <DateTimeContext.Provider value={{date: date, setDate: setDate}}>
        <ManageBlock setData={setData} />
        <RoomHeader />
        <RoomList room_list={room_list} />
      </DateTimeContext.Provider>
    </div>
  );
};

export default MainPage;
