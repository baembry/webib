import React, { Component } from "react";
import { getLabel } from "../../../utilities/labels";

//this is not being used. It was an experiment.

class TextInput extends Component {
  state = {
    inputValue: ""
  };
  constructor(props) {
    super(props);
    this.state.inputValue = this.props.value;
  }

  render() {
    const name = this.props.name,
      handleChange = this.props.handleChange,
      handleFilter = this.props.handleFilter,
      value = this.props.value,
      required = this.props.value;
    const instructions = {
      title: "Will be rendered exactly as entered. Case sensitive.",
      edition:
        "Will be rendered exactly as entered. Include letters. E.g., '1st', '2nd', etc.",
      year: "Can enter a year range. E.g., 1987-1994",
      retrievedFrom:
        "Will be rendered exactly as entered. This field can be used to include any optional information. E.g., 'doi:...', 'http://...', or 'Print'.",
      email: "Enter your email."
    };
    const label = getLabel(name);
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          title={instructions[name] || "Will be rendered exactly as entered."}
          name={name}
          value={this.state.inputValue}
          className="form-control"
          placeholder={label}
          onChange={handleChange}
          onBlur={handleFilter}
          required={required}
        />
      </div>
    );
  }
}

export default TextInput;
