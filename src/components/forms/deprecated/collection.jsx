import React from "react";
import Display from "../../display";
import axios from "axios";
import auth from "../../../services/authService";
import { Link } from "react-router-dom";

import StyleDropdown from "../../pageComponents/styleDropdown";
import AddToCollection from "../buttons/addToCollection";

class Collection extends Display {
  state = {
    collectionId: "abc123",
    collectionName: "My Fleeting Collection",
    searchBase: [],
    entriesToShow: [],
    style: "chicago15B",
    collections: [],
    showEntry: false,
    entryToShow: {},
    clientY: 0,
    entriesToMove: []
  };

  async componentDidMount() {
    await auth.setUser(this);
    const collectionId = this.props.match.params.collectionId;
    try {
      var { data: collection } = await axios.get(
        "/collections/" + collectionId
      );
      if (this.state.userId) {
        const { data: collections } = await axios.get("/collections");
        await this.setState({ collections });
      }

      await this.setState({
        collectionId: collection._id,
        collectionName: collection.name,
        entriesToShow: collection.entries,
        //entries is for the sake of the handleSearch
        searchBase: collection.entries
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="flex space-between align-center">
          <StyleDropdown handleStyleSelect={this.handleStyleSelect} />
          <Link
            to={"/collections/" + this.state.collectionId + "/new-entry"}
            className="btn btn-outline-primary no-width"
          >
            Create Entry and Add to Collection
          </Link>
          <AddToCollection
            collections={this.state.collections}
            handleAddToCollection={this.handleAddToCollection}
          />
        </div>

        <h1>{this.state.collectionName}</h1>
        {this.state.userId ? null : (
          <div className="alert alert-danger">
            This bibliography will disapear if you navigate away from this page,
            or else in two days. To save your work, create an account or log in.
          </div>
        )}
        {this.state.entriesToShow ? this.renderContent() : null}
      </div>
    );
  }
}

export default Collection;
