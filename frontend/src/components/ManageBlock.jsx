import React, { useEffect, useState } from "react";
import SortRooms from "./SortRooms";
import FilterRooms from "./FilterRooms";

const ManageBlock = (props) => {

  useEffect(() => {
    localStorage.setItem(
      'get_list',
      JSON.stringify({})
    );
  }, []);


  return (
    <div className="filters_element">
      <SortRooms setData={props.setData} />
      <FilterRooms setData={props.setData} />
    </div>
  );
};

export default ManageBlock;
