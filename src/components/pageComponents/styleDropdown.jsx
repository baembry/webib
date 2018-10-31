import React from "react";

const StyleDropdown = ({ handleStyleSelect, styles, disabled }) => {
  return (
    <div className="style-dropdown-container">
      <label htmlFor="style">Select a bibliography style</label>
      <select
        id="style"
        name="style"
        className="form-control dropdown"
        onChange={handleStyleSelect}
        disabled={disabled}
      >
        {styles.map((style, i) => (
          <option key={i} value={style._id}>
            {style.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StyleDropdown;
