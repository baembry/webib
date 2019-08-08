import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import auth from '../services/authService';

class Landing extends Component {
  //flashMessage is passed in props
  state = {
    showModal: false,
    userId: false,
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
    this.props.toggleLoading();
    const email = +new Date();
    try {
      this.handleToggleModal();
      this.setState({ working: true });
      const res = await axios.post('/users', {
        email: email.toString() + '@fakemail.com',
        password: '12345',
        createdAt: new Date(),
      });
      auth.login(res.headers['x-auth-token']);

      //force refresh
      this.props.toggleLoading();
      window.location = '/entries?collectionId=allEntries';
    } catch (error) {
      console.log('The error is: ', error);
      this.props.toggleLoading();
      this.props.flashMessage(error.message, 'danger', 1500); //executed in app.js
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
      <div className="landing-container">
        <div className="landing">
          <h1>Welcome to Webib!</h1>
          <h3>The world's simplest bibliography manager.</h3>

          <ul>
            <li>Cloud-based: never worry about conflicting data.</li>
            <li>Collaborative: use other people's references.</li>
            <li>Super simple: no tutorials or learning curve.</li>
          </ul>
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

export default Landing;
