import React from "react";

import { getLabel } from "../../../utilities/labels";

const Dropdown = ({ name, values, handleChange, handleFilter, value }) => {
  return (
    <div className="form-group dropdown">
      <label htmlFor={name}>{getLabel(name)}</label>
      <select
        name={name}
        value={value}
        className="form-control"
        onChange={handleChange}
        onBlur={handleFilter}
      >
        {values.map(value => {
          return (
            <option key={value} value={value}>
              {getLabel(value)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
