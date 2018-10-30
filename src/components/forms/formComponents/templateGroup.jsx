import React from "react";

import { getLabel } from "../../../utilities/labels";

const TemplateGroup = ({
  entryType,
  renderFieldsArray,
  renderTemplates,
  handleStyleFont,
  style
}) => {
  console.log("template group style: ", style);
  return (
    <div>
      <legend>{getLabel(entryType)}</legend>
      <small>
        <p>
          Valid entry field names: {renderFieldsArray(entryType).join(", ")}
        </p>
      </small>
      {renderTemplates(entryType)}
      <div
        className="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Italicize
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            {renderFieldsArray(entryType).map((field, i) => (
              <div className="dropdown-item" key={i}>
                <input
                  type="checkbox"
                  name={entryType}
                  value={field}
                  onChange={e => handleStyleFont(e, { fontStyle: "italic" })}
                  checked={
                    style && style[field]
                      ? style[field].fontStyle === "italic"
                      : false
                  }
                />
                {getLabel(field)}
              </div>
            ))}
          </div>
        </div>
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Underline
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            {renderFieldsArray(entryType).map((field, i) => (
              <div className="dropdown-item" key={i}>
                <input
                  type="checkbox"
                  name={entryType}
                  value={field}
                  onChange={e =>
                    handleStyleFont(e, { textDecoration: "underline" })
                  }
                  checked={
                    style && style[field]
                      ? style[field].textDecoration === "underline"
                      : false
                  }
                />
                {getLabel(field)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGroup;
