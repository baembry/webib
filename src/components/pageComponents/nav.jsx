import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import auth from "../../services/authService";

class NavBar extends Component {
  state = {
    showModal: false
  };

  handleToggleModal = () => {
    const showModal = this.state.showModal;
    this.setState({ showModal: !showModal });
  };
  renderModal = () => {
    var modal = null;
    if (this.state.showModal) {
      modal = (
        <div className="alert alert-danger">
          You will be logged in with a temporary user id. Your user id and all
          your work will disappear if you log out, or after two days. If you
          want to save your work, please register and sign in.
          <div>
            <button
              className="btn btn-warning modal-btn"
              onClick={this.handleContinue}
            >
              Continue
            </button>
            <NavLink className="btn btn-success modal-btn" to="/users">
              Register
            </NavLink>
          </div>
        </div>
      );
    }
    return modal;
  };
  handleContinue = async e => {
    e.preventDefault();
    const username = +new Date();
    try {
      const res = await axios.post("/users", {
        username: username.toString(),
        password: "12345",
        createdAt: new Date()
      });
      auth.login(res.headers["x-auth-token"]);

      //force refresh
      window.location = "/entries";
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light">
          <NavLink className="nav-link" to="/">
            Webib!
          </NavLink>
          {this.props.user ? (
            <React.Fragment>
              <NavLink
                className="nav-link"
                to="/entries?collectionId=allEntries"
              >
                All Entries
              </NavLink>
              <NavLink className="nav-link" to="/collections" disabled>
                Collections
              </NavLink>
              <NavLink className="nav-link" to="/styles">
                My Styles
              </NavLink>
              <button className="btn btn-primary" onClick={auth.logout}>
                Logout
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink className="nav-link" to="/users">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/auth">
                Login
              </NavLink>
              <div
                className="nav-link clickable"
                onClick={this.handleToggleModal}
              >
                Continue without Logging in
              </div>
            </React.Fragment>
          )}
        </nav>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

export default NavBar;
