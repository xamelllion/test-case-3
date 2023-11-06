const jwtAuth = async (state) => {
  await fetch("http://127.0.0.1:8765/api/token/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      window.location.href = '/';
    });
};

export default jwtAuth;
