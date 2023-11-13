import React, {useCallback, useContext, useEffect, useState} from "react";
import './index.css';
import dateFormat from "dateformat";
import { jwtDecode } from "jwt-decode";
import DateBlock from "./DateBlock";
import { DateTimeContext } from "../utils/context";


const RoomElement = (props) => {
  let [button, setButton] = useState(null);

  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);

  const handleStartDate = (value) => {setStartDate(value);}
  const handleEndDate = (value) => {setEndDate(value);}

  let context = useContext(DateTimeContext);

  const bookRoom = (e) => {
    e.preventDefault();

    let get_list = JSON.parse(localStorage.getItem('get_list'));
    localStorage.setItem('get_list', JSON.stringify(get_list));
    setStartDate(get_list.startDate);
    setEndDate(get_list.endDate);
    if (get_list.startDate == null || get_list.endDate == null) {
      alert('Выберите даты для бронирования!');
      return;
    }

    let body = props.data;
    if (localStorage.getItem('access') === null) {
      alert('Авторизуйтесь для выполнения этого действия!');
      return;
    }

    const decoded = jwtDecode(localStorage.getItem('access'));
    body.is_booked = true;
    body.booked_by = decoded.user_id;
    body.check_in_date = dateFormat(get_list.startDate, 'yyyy-mm-dd');
    body.check_out_date = dateFormat(get_list.endDate, 'yyyy-mm-dd');
    console.log(JSON.stringify(body))


    fetch(`http://127.0.0.1:8765/rooms/${body.id}/?modify=true`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify(body)
    })
    .then((response) => {
      if (response.status === 401) {
        alert('Авторизуйтесь для выполнения этого действия!');
        // jwtUpdate
      }
      else
        setButton(
          <input type="button" value="Разбронировать" className="booked_by_user" onClick={unBookRoom} />
        );
    });

  }

  const unBookRoom = (e) => {
    let body = props.data;
    body.is_booked = false;
    body.check_in_date = null;
    body.check_out_date = null;
    e.preventDefault();
    console.log(JSON.stringify(body))

    fetch(`http://127.0.0.1:8765/rooms/${body.id}/?modify=true`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify(body)
    })
    .then((response) => {
      if (response.status === 401) {
        // jwtUpdate
        alert('Ошибка авторизации');
      } else {
        setButton(
          <input type="button" value="Забронировать" className="to_book" onClick={bookRoom} />
        );
        setStartDate(null);
        setEndDate(null);
      }
    })
  }

  // useEffect(() => {
  //   setStartDate(
  //     Date.parse(
  //       props.data.check_in_date
  //     )
  //   );
  //   setEndDate(
  //     Date.parse(
  //       props.data.check_in_date
  //     )
  //   );
  // }, []);

  useEffect(() => {
    let decoded = -1;
    if (localStorage.getItem('access')) {
      decoded = jwtDecode(localStorage.getItem('access'));
    }
    if (props.data.is_booked) {
      setButton(<input type="button" value="Разбронировать" className="booked_by_user" onClick={unBookRoom} />);
    } else {
      setButton(<input type="button" value="Забронировать" className="to_book" onClick={bookRoom} />);
    }
  }, [startDate, endDate]);

  return (
    <div className="Room-Element">
      <div className="room_name">{props.data.room_name}</div>
      <div className="daily_cost">{props.data.daily_cost}</div>
      <div className="num_of_seats">{props.data.num_of_seats}</div>
      {/* <DateBlock
        startDate={startDate}
        endDate={endDate}
        setStartDate={handleStartDate}
        setEndDate={handleEndDate}
      /> */}
      <div className="is_booked">
        {button}
      </div>
    </div>
  );
};

export default RoomElement;
