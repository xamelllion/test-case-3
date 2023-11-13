import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import fetchRoomList from "../utils/fetchRoomList";
import DateBlock from "./DateBlock";
import dateFormat from "dateformat";
import { DateTimeContext } from "../utils/context";
import "react-datepicker/dist/react-datepicker.css";


const SortRooms = (props) => {
  const options = [
    { value: "inc", label: "По возрастанию" },
    { value: "des", label: "По убыванию" },
  ];
  const [priceOption, setPriceOption] = useState(null);
  const [countOption, setCountOption] = useState(null);


  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);

  const handleStartDate = (value) => {setStartDate(value);}
  const handleEndDate = (value) => {setEndDate(value);}

  let context_data = useContext(DateTimeContext);
  
  useEffect(() => {
    if (priceOption !== null) {
      setCountOption(null);
      let get_list = JSON.parse(localStorage.getItem('get_list'));
      get_list.price_option = priceOption.value;
      delete get_list.count_option;
      localStorage.setItem('get_list', JSON.stringify(get_list));
      fetchRoomList(props.setData, get_list);
    }
  }, [priceOption]);

  useEffect(() => {
    if (countOption !== null) {
      setPriceOption(null);
      let get_list = JSON.parse(localStorage.getItem('get_list'));
      get_list.count_option = countOption.value;
      delete get_list.price_option;
      localStorage.setItem('get_list', JSON.stringify(get_list));
      fetchRoomList(props.setData, get_list);
    }
  }, [countOption]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      if (startDate > endDate) {
        alert('Заехать надо раньше чем выехать!');
        // setStartDate(null);
        // setEndDate(null);
      }
      else {
        let st = dateFormat(startDate, 'yyyy-mm-dd');
        let nd = dateFormat(endDate, 'yyyy-mm-dd');
        let get_list = JSON.parse(localStorage.getItem('get_list'));
        // get_list.check_in_date__gte = st;
        // get_list.check_in_date__lte = nd;

        get_list.check_in_date__lte = nd;
        get_list.check_out_date__gte = st;
        localStorage.setItem('get_list', JSON.stringify(get_list));
        fetchRoomList(props.setData, get_list);
      }
    }
  }, [startDate, endDate, props.setData]);
  
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
      <div className="sort_option">
        <p>Выберите даты:</p>
        <DateBlock
          startDate={startDate}
          endDate={endDate}
          setStartDate={handleStartDate}
          setEndDate={handleEndDate}
        />
      </div>
    </div>
  );
};

export default SortRooms;
