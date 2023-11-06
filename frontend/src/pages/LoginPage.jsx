import React, {useState} from "react";
import "./App.css";
import jwtAuth from "../utils/jwtAuth";

const LoginPage = () => {

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
    jwtAuth(state);
  };

  return (
    <div className="App">
      <div className="login_wrapper">
        <h2 className="form_header">Login</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <input type="text" name="username" id="" required placeholder="Username" onChange={handleInputChange}/>
          <input type="password" name="password" id="" required placeholder="Password" onChange={handleInputChange}/>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
