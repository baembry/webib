import React from "react";
import Register from "./register";
import axios from "axios";
import auth from "../../services/authService";

class Login extends Register {
  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data: jwt } = await axios.post("/auth", this.state.data);
      auth.login(jwt);
      //force refresh
      window.location = "/entries";
    } catch (error) {
      return error.response ? this.flashMessage(error.response.data) : null;
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="login">
          <h1>Login</h1>
          {this.renderForm()}
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
