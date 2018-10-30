import React from "react";
import { getLabel } from "../../../utilities/labels";

const TextInput = ({ name, handleChange, handleFilter, value, required }) => {
  const label = getLabel(name);
  const instructions = {
    title: "Will be rendered exactly as entered. Case sensitive.",
    edition:
      "Will be rendered exactly as entered. Include letters. E.g., '1st', '2nd', etc.",
    year: "Can enter a year range. E.g., 1987-1994",
    retrievedFrom:
      "Will be rendered exactly as entered. This field can be used to include any optional information. E.g., 'doi:...', 'http://...', or 'Print'."
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        title={instructions[name] || "Will be rendered exactly as entered."}
        name={name}
        value={value}
        className="form-control"
        placeholder={label}
        onChange={handleChange}
        onBlur={handleFilter}
        required={required}
      />
    </div>
  );
};

export default TextInput;
