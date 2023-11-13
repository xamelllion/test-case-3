import React, { useState, useEffect } from "react";
import fetchRoomList from "../utils/fetchRoomList";

const FilterRooms = (props) => {
  let [price1, setPrice1] = useState(0);
  let [price2, setPrice2] = useState(100000);

  let [num1, setNum1] = useState(0);
  let [num2, setNum2] = useState(10);

  
  useEffect(() => {
    if (price1 !== 0 || price2 !== 100000) {
      let get_list = JSON.parse(localStorage.getItem('get_list'));
      get_list.daily_cost__gte = price1;
      get_list.daily_cost__lte = price2;
      localStorage.setItem('get_list', JSON.stringify(get_list));
      fetchRoomList(props.setData, get_list);
    }
  }, [price1, price2]);

  useEffect(() => {
    if (num1 !== 0 || num2 !== 10) {
      let get_list = JSON.parse(localStorage.getItem('get_list'));
      get_list.num_of_seats__gte = num1;
      get_list.num_of_seats__lte = num2;
      localStorage.setItem('get_list', JSON.stringify(get_list));
      fetchRoomList(props.setData, get_list);
    }
  }, [num1, num2]);

  return (
    <div className="">
      <p>Фильтры:</p>
      <div className="filter_option">
        <p>Ценовой диапазон:</p>
        <input
          type="number"
          name=""
          min={0}
          placeholder="От"
          value={price1}
          onChange={(e) => {
            setPrice1(e.target.value);
          }}
        />
        <input
          type="number"
          name=""
          min={0}
          placeholder="До"
          value={price2}
          onChange={(e) => {
            setPrice2(e.target.value);
          }}
        />
      </div>
      <div className="filter_option">
        <p>Количество комнат:</p>
        <input
          type="number"
          name=""
          min={0}
          placeholder="От"
          value={num1}
          onChange={(e) => {
            setNum1(e.currentTarget.value);
          }}
        />
        <input
          type="number"
          name=""
          min={0}
          placeholder="До"
          value={num2}
          onChange={(e) => {
            setNum2(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FilterRooms;
