import React, {useState} from "react";
import jwtAuth from "../utils/jwtAuth";
import "./App.css";

const RegisterPage = () => {

  const [state, setState] = useState({
    username: '',
    password: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    fetch("http://104.193.254.90:8765/register/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((response) => {
        if (response.status === 201) {
          jwtAuth(state);
        } else if (response.status === 400) {
          alert('Пользователь с таким именем существует');
        } else {
          alert('Ошибка регистрации');
        }
      });
  };

  return (
    <div className="App">
      <div className="login_wrapper">
        <h2 className="form_header">Register</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <input type="text" name="username" id="" placeholder="Username" onChange={handleInputChange}/>
          <input type="password" name="password" id="" placeholder="Password" onChange={handleInputChange}/>
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
