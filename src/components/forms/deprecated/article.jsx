import React from "react";
import Form from "./formMethods";
import Buttons from "./buttons/buttons";
import Persons from "./formComponents/persons";

class Article extends Form {
  state = {
    data: {
      entryType: "article",
      authors: [],
      editors: [],
      translators: []
    },
    counters: {
      authors: 1,
      editors: 0,
      translators: 0
    },
    errors: {}
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
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
            {this.renderTextInput("year", "Year")}
            {this.renderTextInput("journal", "Journal")}
            {this.renderTextInput("volume", "Volume")}
            {this.renderTextInput("issue", "Issue")}
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
              required={["authors"]}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Article;
