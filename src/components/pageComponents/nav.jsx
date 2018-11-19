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
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light">
          <NavLink className="nav-link" to="/">
            Webib!
          </NavLink>
          {this.props.user ? (
            <React.Fragment>
              <div className="nav-item dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Instructions
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-item">
                    A collection is a list of bibliographic entries. To create a
                    new collection, enter the collection name in "Create New
                    Collection."
                  </div>
                  <div className="dropdown-divider" />
                  <div className="dropdown-item">
                    You can now move between collections (or all entries) using
                    the "Your Collections" dropdown.
                  </div>
                  <div className="dropdown-divider" />
                  <div className="dropdown-item">
                    From within a collection, you can add an entry to the
                    collection by clicking "Create Entry and Add to Collection."
                  </div>
                  <div className="dropdown-divider" />
                  <div className="dropdown-item">
                    If you are in All Entries, you can create an entry by
                    clicking "Create Entry."
                  </div>
                  <div className="dropdown-divider" />
                  <div className="dropdown-item">
                    You can add an existing entry to an existing collection by
                    checking the box next to the entry and clicking "Add
                    Selected Entries To..."
                  </div>
                  <div className="dropdown-divider" />
                  <div className="dropdown-item">
                    Choose a bibliography style with "Select a Bibliography
                    Style," or create a new style by going to "Your Styles" in
                    the navigation bar.
                  </div>
                  <div className="dropdown-divider" />
                </div>
              </div>
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
                Your Styles
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
