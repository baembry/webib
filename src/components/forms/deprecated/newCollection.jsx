import React, { Component } from "react";
import axios from "axios";

import auth from "../../../services/authService";

import TextInput from "../formComponents/textInput";

class NewCollection extends Component {
  state = {
    name: "",
    userId: ""
  };

  componentDidMount() {
    auth.setUser(this);
  }
  handleChange = e => {
    const name = e.currentTarget.value;
    this.setState({ name: name });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/collections", this.state);
    } catch (error) {
      console.log(error.message);
    }
    this.props.history.push("/collections");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <TextInput name="name" onChange={this.handleChange} />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default NewCollection;
