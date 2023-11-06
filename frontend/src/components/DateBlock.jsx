import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";


const DateBlock = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    console.log(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="filter_date_option">
      <DatePicker
        className="date_picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        className="date_picker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />
    </div>
  );
};

export default DateBlock;
