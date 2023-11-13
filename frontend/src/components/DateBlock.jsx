import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "dateformat";


const DateBlock = (props) => {

  // let [startDate, setStartDate] = useState(null);
  // let [endDate, setEndDate] = useState(null);

  const handleStart = (date) => {
    console.log(date)
    let get_list = JSON.parse(localStorage.getItem('get_list'));
    get_list.startDate = dateFormat(date, 'yyyy-mm-dd');
    localStorage.setItem('get_list', JSON.stringify(get_list));
    props.setStartDate(date)
  }
  const handleEnd = (date) => {
    let get_list = JSON.parse(localStorage.getItem('get_list'));
    get_list.endDate = dateFormat(date, 'yyyy-mm-dd');
    localStorage.setItem('get_list', JSON.stringify(get_list));
    props.setEndDate(date)
  }



  return (
    <div className="filter_date_option">
      <DatePicker
        className="date_picker"
        selected={props.startDate}
        onChange={handleStart}
        placeholderText="Дата заселения"
      />
      <DatePicker
        className="date_picker"
        selected={props.endDate}
        onChange={handleEnd}
        placeholderText="Дата выселения"
      />
    </div>
  );
};

export default DateBlock;
