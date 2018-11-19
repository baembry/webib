import React, { Component } from "react";

import axios from "axios";
import auth from "../services/authService";

class Collections extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    auth.setUser(this);
    const { data } = await axios.get("/collections");
    this.setState({ data });
  }

  handleDelete = async (collection, index) => {
    this.props.toggleLoading();
    let confirmed = window.confirm(
      `Are you sure you want to delete ${collection.name}?`
    );
    if (confirmed) {
      //update state
      const data = [...this.state.data];
      const originalData = [...data];
      data.splice(index, 1);
      this.setState({ data });

      //send delete request
      try {
        await axios.delete("./collections/" + collection._id);
      } catch (error) {
        console.log(error);
        this.setState({ data: originalData });
      }
    }
    this.props.toggleLoading();
  };

  handleShow = id => {
    this.props.history.push(`/entries?collectionId=${id}`);
  };

  render() {
    if (this.state.data.length > 0) {
      return (
        <div className="collections">
          <h2>Your Collections</h2>
          {this.state.data.map((collection, index) => (
            <div key={collection + index} className="collection-line">
              <div
                className="collection-name clickable"
                onClick={() => this.handleShow(collection._id)}
              >
                {collection.name}
              </div>
              <button
                className="btn btn-danger btn-sm small"
                value={collection._id}
                id={index}
                onClick={() => this.handleDelete(collection, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="alert alert-warning collections">
          You don't have any collections. To make a collection, click 'All
          Entries', and enter your collection name in 'New Collection...'.
        </div>
      );
    }
  }
}

export default Collections;
