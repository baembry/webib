import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom';

import auth from '../../services/authService';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
        createdAt: null,
      },
      errors: '',
    };
  }

  handleChange = e => {
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.toggleLoading();
    try {
      if (this.props.location.pathname === '/users') {
        this.register();
      } else {
        this.login();
      }
      //force refresh
      // window.location = '/entries?collectionId=allEntries';
      this.props.history.push('/entries?collectionId=allEntries');
    } catch (error) {
      this.props.flashMessage(error.message, 'danger', 1500);
    }
    this.props.toggleLoading();
  };

  register = async function() {
    const res = await axios.post('/users', this.state.data);
    auth.login(res.headers['x-auth-token']);
  };

  login = async function() {
    const { data: jwt } = await axios.post('/auth', this.state.data);
    auth.login(jwt);
  };

  demo = async function(e) {
    console.log(this);
    await this.setState({
      data: {
        user: 'demo@demo.com',
        password: 'demo',
      },
    });
    console.log(this.state);
    this.handleSubmit(e);
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
          <div className="register-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              // disabled={!this.state.formIsValid}
            >
              Submit
            </button>
            {this.props.location.pathname === '/auth' ? (
              <NavLink className="btn btn-secondary" to="/users">
                Register
              </NavLink>
            ) : null}
            <button
              className="btn btn-secondary"
              onClick={this.demo.bind(this)}
            >
              Demo
            </button>
          </div>
        </form>
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="register">
          <h1>
            {this.props.location.pathname === '/users' ? 'Register' : 'Login'}
          </h1>
          {this.renderForm()}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
