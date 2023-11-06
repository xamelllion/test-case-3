import React, { useState, useEffect } from "react";
import Select from "react-select";
import fetchRoomList from "../utils/fetchRoomList";
import DateBlock from "./DateBlock";
import "react-datepicker/dist/react-datepicker.css";


const SortRooms = (props) => {
  const options = [
    { value: "inc", label: "По возрастанию" },
    { value: "des", label: "По убыванию" },
  ];
  const [priceOption, setPriceOption] = useState(null);
  const [countOption, setCountOption] = useState(null);

  useEffect(() => {
    if (priceOption !== null) {
      setCountOption(null);
      let get_list = JSON.parse(localStorage.getItem('get_list'));
      get_list.price_sort = `price_option=${priceOption.value}`;
      get_list.num_sort = ``;
      localStorage.setItem('get_list', JSON.stringify(get_list));
      fetchRoomList(props.setData, get_list);
    }
  }, [priceOption]);

  useEffect(() => {
    if (countOption !== null) {
      setPriceOption(null);
      let get_list = JSON.parse(localStorage.getItem('get_list'));
      get_list.num_sort = `count_option=${countOption.value}`;
      get_list.price_sort = ``;
      localStorage.setItem('get_list', JSON.stringify(get_list));
      fetchRoomList(props.setData, get_list);
    }
  }, [countOption]);
  
  return (
    <div className="">
      <p>Сортировки:</p>
      <div className="sort_option">
        <p>Цена:</p>
        <Select
          value={priceOption}
          defaultValue={priceOption}
          onChange={setPriceOption}
          options={options}
          className="sel"
        />
      </div>
      <div className="sort_option">
        <p>Места:</p>
        <Select
          value={countOption}
          defaultValue={countOption}
          onChange={setCountOption}
          options={options}
          className="sel"
        />
      </div>
      {/* <div className="sort_option">
        <p>Выберите даты:</p>
        <DateBlock />
      </div> */}
    </div>
  );
};

export default SortRooms;
