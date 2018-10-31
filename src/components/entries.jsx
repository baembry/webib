import React from "react";
import { Link } from "react-router-dom";

import Display from "./display";
import StyleDropdown from "./pageComponents/styleDropdown";
import CollectionsDropdown from "./pageComponents/collectionsDropdown";
import AddToCollection from "./forms/buttons/addToCollection";

class Entries extends Display {
  render() {
    return (
      <div className="">
        <div className="entries__controls">
          <div className="dropdowns">
            <CollectionsDropdown
              collections={this.state.collections}
              handleCollectionSelect={this.handleCollectionSelect}
              value={this.state.collectionId || "allEntries"}
            />
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="form-control new-collection"
                  placeholder="Enter New Collection..."
                />
              </form>
            </div>
            <StyleDropdown
              styles={this.state.myStyles}
              handleStyleSelect={this.handleStyleSelect}
            />
          </div>
          <div className="create-options">
            <div className="btn-group" role="group" aria-label="Basic example">
              {this.state.collectionId !== "allEntries" ? (
                <Link
                  title="Create a new entry and add it to present collection"
                  to={"/collections/" + this.state.collectionId + "/new-entry"}
                  className="btn btn-outline-primary no-width"
                >
                  Create Entry and Add to Collection
                </Link>
              ) : (
                <Link
                  title="Create a new entry"
                  to="/entries/new"
                  className="btn btn-outline-primary"
                >
                  Create Entry
                </Link>
              )}
              <AddToCollection
                collections={this.state.collections}
                handleAddToCollection={this.handleAddToCollection}
                disabled={
                  this.state.collections.length === 0 ||
                  this.state.entriesToShow.length === 0
                }
              />
            </div>
          </div>
          <div className="checkboxes">
            <div>
              <label htmlFor="useEmDash">Use 3-Em Dash</label>
              <input
                id="useEmDash"
                type="checkbox"
                onClick={this.handleUseEmDash}
              />
            </div>
            <div>
              <label htmlFor="serializeDates">
                Add letters to repeating dates by same persons
              </label>
              <input
                id="serializeDates"
                type="checkbox"
                onClick={this.toggleSerializeDates}
              />
            </div>
          </div>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

export default Entries;
