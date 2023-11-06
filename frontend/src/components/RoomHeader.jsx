import React from "react";
import "./index.css";

const RoomHeader = (props) => {
  return (
    <div className="Room-Element">
      <div className="room_name">Номер комнаты</div>
      <div className="daily_cost">Стоимость (день)</div>
      <div className="num_of_seats">Количество мест</div>
      <div className="is_booked">Доступность</div>
    </div>
  );
};

export default RoomHeader;
