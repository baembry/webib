import React from "react";

const getLabel = name => {
  if (name.split("").pop() === "s") {
    return name.slice(0, 1).toUpperCase() + name.slice(1, -1);
  } else {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }
};

const SubmitButton = ({ disabled, requiredFields }) => {
  const required = requiredFields.map((field, index) => {
    if (requiredFields[index + 1]) {
      return <span key={field}>{getLabel(field)}, </span>;
    } else {
      return <span key={field}>{getLabel(field)}.</span>;
    }
  });
  return (
    <div>
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Submit
      </button>
      <small
        style={{ display: "inline", marginLeft: "5px" }}
        className="form-text text-muted"
      >
        *Required fields: {required}
      </small>
    </div>
  );
};

export default SubmitButton;
