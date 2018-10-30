import React, { Component } from "react";
import axios from "axios";

import auth from "../../services/authService";
import TextInput from "./formComponents/textInput";

class Register extends Component {
  state = {
    data: {
      username: "",
      password: "",
      createdAt: null
    },
    errors: "",
    flash: false
  };

  handleChange = e => {
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/users", this.state.data);
      auth.login(res.headers["x-auth-token"]);

      //force refresh
      window.location = "/entries";
    } catch (error) {
      this.flashMessage(error.response.data);
    }
  };

  flashMessage = async message => {
    await this.setState({ flash: message });
    setTimeout(() => {
      this.setState({ flash: false });
    }, 1700);
  };

  renderForm = () => {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <TextInput
            name="username"
            handleChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Choose a password"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
            // disabled={!this.state.formIsValid}
          >
            Submit
          </button>
        </form>
        {this.state.flash ? (
          <div className="flash-container">
            <div className="alert alert-danger flash">{this.state.flash}</div>
          </div>
        ) : null}
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="register">
          <h1>Register</h1>
          {this.renderForm()}
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
