const jwtUpdate = () => {
  let state = {
    refresh: localStorage.getItem('refresh')
  };

  fetch('http://127.0.0.1:8765/api/token/', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state)
    }).then((response) => {
      if (response.status === 401) {
        alert('Вам нужно заново войти в аккаунт');
        window.location.href = '/login';
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('access', data.access);
    });
};

export default jwtUpdate;
