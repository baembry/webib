import React from "react";
import Form from "../formMethods";
import Joi from "joi-browser";

const Author = props => {
  return (
    <div className="form-group">
      <input
        type="text"
        name={"authors[" + props.index + "]firstName"}
        className="form-control"
        placeholder="Author's First Name"
        onChange={props.onChange}
      />
      <input
        type="text"
        name={"authors[" + props.index + "]lastName"}
        className="form-control"
        placeholder="Author's Last Name"
        onChange={props.onChange}
      />
    </div>
  );
};

export default Author;
