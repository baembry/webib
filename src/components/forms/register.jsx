import React, { Component } from "react";
import axios from "axios";

import auth from "../../services/authService";

class Register extends Component {
  state = {
    data: {
      email: "",
      password: "",
      createdAt: null
    },
    errors: ""
  };

  handleChange = e => {
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    try {
      const res = await axios.post("/users", this.state.data);
      auth.login(res.headers["x-auth-token"]);

      //force refresh
      window.location = "/entries?collectionId=allEntries";
    } catch (error) {
      this.props.flashMessage(error.message, "danger", 1500);
    }
    this.props.toggleLoading();
  };

  renderForm = () => {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.data.email}
            className="form-control"
            placeholder="Email"
            onChange={this.handleChange}
            required={true}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={this.handleChange}
            required={true}
          />
          <button
            type="submit"
            className="btn btn-primary"
            // disabled={!this.state.formIsValid}
          >
            Submit
          </button>
        </form>
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
