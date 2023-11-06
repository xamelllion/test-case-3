const fetchRoomList = (setData, get_list) => {
  let get_string = '?';
  for(let key in get_list) {
    get_string += get_list[key];
    if (get_list[key] !== '')
      get_string += '&';
  }
  console.log(get_string, get_list);
  // get_list = [];
  fetch(`http://127.0.0.1:8765/rooms/${get_string}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => response.json())
  .then((resp) => {
    setData(resp);
  });
};

export default fetchRoomList;
