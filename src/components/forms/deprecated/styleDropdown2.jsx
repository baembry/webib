import React from "react";

const StyleDropdown2 = ({ handleStyleSelect2, myStyles }) => {
  return (
    <select
      id="style"
      name="style"
      className="form-control dropdown"
      onChange={handleStyleSelect2}
    >
      {myStyles.map((style, i) => (
        <option key={i} value={style._id}>
          {style.label}
        </option>
      ))}
    </select>
  );
};

export default StyleDropdown2;
