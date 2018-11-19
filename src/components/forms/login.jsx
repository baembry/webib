import React from "react";
import Register from "./register";
import axios from "axios";
import auth from "../../services/authService";

class Login extends Register {
  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    try {
      const { data: jwt } = await axios.post("/auth", this.state.data);
      auth.login(jwt);
      //force refresh
      window.location = "/entries?collectionId=allEntries";
    } catch (error) {
      this.props.flashMessage(error.message, "danger", 1500);
    }
    this.props.toggleLoading();
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
