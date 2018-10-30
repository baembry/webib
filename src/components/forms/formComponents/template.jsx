import React from "react";

const Template = ({ entryType, index, handleChange, value }) => {
  return (
    <input
      type="text"
      className="form-control template"
      onChange={e => handleChange(e, entryType, index)}
      value={value}
    />
  );
};

export default Template;
