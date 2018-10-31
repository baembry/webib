import React from "react";

import forms from "../../utilities/forms";
import styles from "../../utilities/styles";
import { Style } from "../../utilities/styleObj";

import Entry from "../entry";
import FormClass from "./formClass";
import Buttons from "./buttons/buttons";
import SubmitButton from "./buttons/SubmitButton";
import TextInput from "./formComponents/textInput";
import Persons from "./formComponents/persons";
import TextArea from "./formComponents/textArea";
import Dropdown from "./formComponents/dropdown";

class NewEntry extends FormClass {
  //==State, Handlers, and setState in classForm==

  //=====================RENDER=========================//
  render() {
    let chicago16bib = styles.find(style => (style._id = "chicago16bib"));
    const style = new Style(chicago16bib);
    return this.state.fieldsToGenerate ? (
      <React.Fragment>
        <div className="new-entry__buttons">
          <Buttons
            counters={this.state.counters}
            onAdd={this.handleAddPerson}
            onSubtract={this.handleSubtractPerson}
            required={this.state.requiredFields}
          />
        </div>
        <div className="new-entry">
          <div className="form-container">
            <div className="form-container__instructions">
              Hover for instructions
            </div>
            <Dropdown
              name="entryType"
              values={Object.keys(forms)}
              handleChange={this.handleDropdownSelect}
              value={this.state.data.entryType}
            />

            <form onSubmit={this.handleSubmit}>
              <Persons
                counters={this.state.counters}
                handleChange={this.handleChange}
                handleFilter={this.handleFilter}
                data={this.state.data}
                requiredFields={this.state.requiredFields}
              />
              {this.state.fieldsToGenerate.map((field, i) => (
                <TextInput
                  key={i}
                  name={field}
                  value={this.state.data[field]}
                  handleChange={this.handleChange}
                  handleFilter={this.handleFilter}
                  required={this.state.requiredFields.includes(field)}
                />
              ))}
              <TextArea
                name="abstract"
                onChange={this.handleChange}
                value={this.state.data.abstract}
              />
              <TextArea
                name="notes"
                onChange={this.handleChange}
                value={this.state.data.notes}
              />
              <SubmitButton
                disabled={!this.state.formIsValid}
                requiredFields={this.state.requiredFields}
              />
            </form>
          </div>

          {/* ==================RENDER SEARCH RESULTS FOR NEW ENTRY ONLY============== */}
          {this.state.filtered ? (
            <div className="search-results">
              <div className="search-results__instructions">
                Existing entries that match your data will appear here. Click
                one to populate your form.
              </div>
              {this.state.filtered.map((entry, i) => (
                <Entry
                  key={i}
                  entry={entry}
                  style={style}
                  onClick={this.handleCopyEntry}
                  checkboxDisplay={"none"}
                />
              ))}
            </div>
          ) : null}
        </div>
      </React.Fragment>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default NewEntry;
