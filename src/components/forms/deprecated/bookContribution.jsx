import React from "react";
import Form from "./formMethods";
import Buttons from "../buttons/buttons";
import Persons from "../formComponents/persons";

class BookContribution extends Form {
  state = {
    data: {
      entryType: "bookContribution",
      authors: [],
      editors: [],
      translators: []
    },
    counters: {
      authors: 1,
      editors: 1,
      translators: 0
    },
    errors: {}
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            {/* refactor persons to make one component render all components */}
            <Persons
              type="authors"
              label="Author"
              counters={this.state.counters}
              onChange={this.handleChange}
            />
            <Persons
              type="editors"
              label="Editor"
              counters={this.state.counters}
              onChange={this.handleChange}
            />
            <Persons
              type="translators"
              label="Translator"
              counters={this.state.counters}
              onChange={this.handleChange}
            />
            {this.renderTextInput("title", "Title")}
            {this.renderTextInput("publisher", "Publisher")}
            {this.renderTextInput("year", "Year")}
            {this.renderTextInput("city", "City")}
            {this.renderTextInput("volume", "Volume")}
            {this.renderTextAreaInput("notes", "Notes")}
            {this.renderTextAreaInput("abstract", "Abstract")}
            {this.renderSubmitButton("Submit")}
            <small
              style={{ display: "inline", marginLeft: "5px" }}
              className="form-text text-muted"
            >
              *Author and title are required.
            </small>
          </form>

          <div className="buttons">
            <Buttons
              counters={this.state.counters}
              onAdd={this.handleAddPerson}
              onSubtract={this.handleSubtractPerson}
              required={["authors", "editors"]}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookContribution;
