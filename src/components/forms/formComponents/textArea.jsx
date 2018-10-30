import React from "react";

const getLabel = name => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};
const TextArea = ({ name, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{getLabel(name)}</label>
      <textarea
        type="textarea"
        name={name}
        className="form-control"
        placeholder={getLabel(name)}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
