import React from "react";
import ButtonGroup from "./buttonGroup";

const Buttons = ({ counters, onAdd, onSubtract, required }) => {
  return (
    <React.Fragment>
      <ButtonGroup
        target="authors"
        count={counters.authors}
        onAdd={onAdd}
        onSubtract={onSubtract}
        required={required}
      />
      <ButtonGroup
        target="editors"
        count={counters.editors}
        onAdd={onAdd}
        onSubtract={onSubtract}
        required={required}
      />
      <ButtonGroup
        target="translators"
        count={counters.translators}
        onAdd={onAdd}
        onSubtract={onSubtract}
        required={required}
      />
    </React.Fragment>
  );
};

export default Buttons;
