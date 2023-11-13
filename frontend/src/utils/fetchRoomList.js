const fetchRoomList = (setData, get_list) => {
  let get_string = '?';
  for(let key in get_list) {
    get_string += `${key}=${get_list[key]}&`;
  }
  console.log(get_string, get_list);
  fetch(`http://127.0.0.1:8765/rooms/${get_string}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('access')}`
    },
  })
  .then((response) => response.json())
  .then((resp) => {
    setData(resp);
    console.log(resp)
  });
};

export default fetchRoomList;
