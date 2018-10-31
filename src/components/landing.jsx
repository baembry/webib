import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import auth from "../services/authService";

class Landing extends Component {
  state = {
    showModal: false,
    userId: false
  };

  componentDidMount() {
    auth.setUser(this);
  }

  handleToggleModal = () => {
    const showModal = this.state.showModal;
    this.setState({ showModal: !showModal });
  };
  renderModal = () => {
    var modal = null;
    if (this.state.showModal) {
      modal = (
        <div className="alert alert-danger landing__modal">
          You will be logged in with a temporary user id. Your user id and all
          your work will disappear if you log out, or after two days. If you
          want to save your work, please register and sign in.
          <div>
            <button className="btn btn-warning" onClick={this.handleContinue}>
              Continue
            </button>
            <NavLink to="/users" className="btn btn-success">
              Register
            </NavLink>
            <button
              className="btn btn-secondary"
              onClick={this.handleToggleModal}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    return modal;
  };
  handleContinue = async e => {
    e.preventDefault();
    const email = +new Date();
    try {
      const res = await axios.post("/users", {
        email: email.toString() + "@fakemail.com",
        password: "12345",
        createdAt: new Date()
      });
      auth.login(res.headers["x-auth-token"]);

      //force refresh
      window.location = "/entries?collectionId=allEntries";
    } catch (error) {
      console.log(error);
    }
  };

  renderButtons = () => {
    if (!this.state.userId) {
      return (
        <div>
          <NavLink className="btn btn-primary" to="/users">
            Register
          </NavLink>
          <NavLink className="btn btn-secondary" to="/auth">
            Login
          </NavLink>
          <div className="btn btn-warning" onClick={this.handleToggleModal}>
            Continue without Logging in
          </div>
          {this.renderModal()}
        </div>
      );
    } else {
      return null;
    }
  };
  render() {
    return (
      <div className="landing">
        <h1>Welcome to Webib!</h1>
        <h3>The world's simplest bibliography manager.</h3>

        <ul>
          <li>Cloud-based: never worry about conflicting data.</li>
          <li>
            Collaborative: if a citation has already been entered, just click to
            add it to your collections.
          </li>
          <li>
            Super simple: self-explanatory interface; no tutorials or learning
            curve.
          </li>
        </ul>
        {this.renderButtons()}
      </div>
    );
  }
}

export default Landing;
