import React from "react";

const ButtonGroup = ({ target, onAdd, onSubtract, count, required }) => {
  return (
    <React.Fragment>
      <button
        className="btn btn-primary"
        name={target}
        onClick={() => onAdd(target)}
      >
        Add {target.slice(0, -1)}
      </button>
      <button
        className="btn btn-outline-primary"
        name={target}
        onClick={() => onSubtract(target)}
        disabled={(required.includes(target) && count === 1) || !count}
      >
        Subtract {target.slice(0, -1)}
      </button>
    </React.Fragment>
  );
};

export default ButtonGroup;
