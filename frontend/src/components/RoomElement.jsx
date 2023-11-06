import React, {useEffect, useState} from "react";
import './index.css';
import { jwtDecode } from "jwt-decode";


const RoomElement = (props) => {
  let [button, setButton] = useState(null);


  const bookRoom = (e) => {
    e.preventDefault();

    let body = props.data;
    if (localStorage.getItem('access') === null) {
      alert('Авторизуйтесь для выполнения этого действия!');
      return;
    }
    const decoded = jwtDecode(localStorage.getItem('access'));
    body.is_booked = true;
    body.booked_by = decoded.user_id;


    fetch(`http://127.0.0.1:8765/rooms/${body.id}/`, {
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
    e.preventDefault();

    fetch(`http://127.0.0.1:8765/rooms/${body.id}/`, {
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
      }
    })
  }


  useEffect(() => {
    let decoded = -1;
    if (localStorage.getItem('access')) {
      decoded = jwtDecode(localStorage.getItem('access'));
    }
    console.log(props.data, decoded.user_id)
    if (props.data.is_booked && props.data.booked_by === decoded.user_id) {
      setButton(<input type="button" value="Разбронировать" className="booked_by_user" onClick={unBookRoom} />);
    } else if (props.data.is_booked) {
      setButton(<input type="button" value="Занято" className="booked" />);
    } else {
      setButton(<input type="button" value="Забронировать" className="to_book" onClick={bookRoom} />);
    }
  }, []);

  return (
    <div className="Room-Element">
      <div className="room_name">{props.data.room_name}</div>
      <div className="daily_cost">{props.data.daily_cost}</div>
      <div className="num_of_seats">{props.data.num_of_seats}</div>
      <div className="is_booked">
        {button}
      </div>
    </div>
  );
};

export default RoomElement;
