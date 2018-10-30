import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Entries from "../../entries";
import StyleDropdown from "../../pageComponents/styleDropdown";

class NoUser extends Entries {
  state = {
    entriesToShow: [],
    collectionId: "",
    style: "chicago15B"
  };
  async componentDidMount() {
    const { data: collection } = await axios.post("/collections", {
      name: "Expires two days from " + new Date().getDate().toString()
    });
    this.setState({
      entriesToShow: collection.entries,
      collectionId: collection._id
    });
  }
  render() {
    return (
      <div className="container">
        <div className="flex space-between align-center">
          <Link
            to={"/collections/" + this.state.collectionId + "/new-entry"}
            className="btn btn-outline-primary no-width"
          >
            + Create an entry to start a new collection
          </Link>
        </div>
      </div>
    );
  }
}

export default NoUser;
