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
      <React.Fragment>
        <div className="landing">
          <h1>Welcome to the world's</h1>
          <h1>simplest</h1>
          <h1>bibliography manager</h1>
          <img
            className="bookshelf"
            alt="Bookshelf icon"
            src="bookshelf.svg"
          ></img>
          <NavLink className="btn btn-secondary" to="/auth">
            Get Started
          </NavLink>
        </div>
        <div className="attribution">
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default Landing;
