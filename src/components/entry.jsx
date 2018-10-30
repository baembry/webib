import React from "react";

const Entry = ({
  entry,
  previousEntry,
  style,
  onClick,
  handleCheck,
  checkboxDisplay,
  useEmDash,
  serializeDates
}) => {
  const getComponent = (name, i) => {
    const spanStyle = style[entry.entryType].style
      ? style[entry.entryType].style[name]
      : null;

    return (
      <span key={i} style={spanStyle}>
        {style[entry.entryType].format[name]
          ? style[entry.entryType].format[name](entry[name])
          : entry[name] +
            (name === "year" && serializeDates ? entry.annoAddendum : "")}
      </span>
    );
  };

  const getTextContent = name => {
    let text = style[entry.entryType].format[name]
      ? style[entry.entryType].format[name](entry[name])
      : entry[name];
    text = text.replace("..", ".");
    return text;
  };

  //checks equivalence for 1-d arrrays of 1-d objects
  function areEquivalent(arr1, arr2) {
    var result = true;
    if (
      arr1.length !== arr2.length ||
      !Array.isArray(arr2) ||
      !Array.isArray(arr1)
    ) {
      return false;
    }
    arr1.forEach((author, i) => {
      if (
        author.firstName !== arr2[i].firstName ||
        author.lastName !== arr2[i].lastName
      ) {
        result = false;
      }
    });
    return result;
  }
  function getPrimaryPerson(entry) {
    const template0 = style[entry.entryType].templates[0];
    var fieldName = template0.match(/\/\w+\//i)[0];
    fieldName = fieldName.slice(1, fieldName.length - 1);
    return entry[fieldName];
  }

  const fillTemplate = entry => {
    var result;
    if (!style[entry.entryType]) {
      result = (
        <span style={{ color: "red" }}>
          {entry.title + " invalid entry type or style"}
        </span>
      );
    } else {
      result = style[entry.entryType].templates.reduce(function(
        acc,
        template,
        i
      ) {
        // template === a string like .../editors/...
        var fieldName = template.match(/\/\w+\//i)[0];
        fieldName = fieldName.slice(1, fieldName.length - 1);
        var templateParts = template.split("/");
        var indexOfFieldName = templateParts.indexOf(fieldName);
        //fill template only if entry has corresponding field value
        if (!entry[fieldName] || entry[fieldName].length === 0) {
          return acc;
        } else if (
          //for using emdash
          previousEntry &&
          useEmDash &&
          i === 0 &&
          areEquivalent(entry[fieldName], getPrimaryPerson(previousEntry))
        ) {
          // var templateParts = template.split("/");
          // var indexOfFieldName = templateParts.indexOf(fieldName);
          templateParts.splice(
            indexOfFieldName,
            1,
            <span key={i}>&mdash;&mdash;&mdash;</span>
          );
        } else {
          // templateParts = template.split("/");
          // indexOfFieldName = templateParts.indexOf(fieldName);
          templateParts.splice(indexOfFieldName, 1, getComponent(fieldName, i));
        }
        //eliminate ".." in case initial ends authors list
        if (
          getTextContent(fieldName).endsWith(".") &&
          templateParts[indexOfFieldName + 1].startsWith(".")
        ) {
          templateParts[indexOfFieldName + 1] = templateParts[
            indexOfFieldName + 1
          ].slice(1);
        }

        //take care of eds. problem ad hoc;
        const indexMutandi = templateParts.findIndex(
          part => typeof part === "string" && part.includes("(s)")
        );

        if (indexMutandi > -1) {
          if (entry[fieldName].length < 2) {
            templateParts[indexMutandi] = templateParts[indexMutandi].replace(
              "(s)",
              ""
            );
          } else {
            templateParts[indexMutandi] = templateParts[indexMutandi].replace(
              "(s)",
              "s"
            );
          }
        }

        return [...acc, templateParts];
      },
      []);
    }
    return result;
  };

  return (
    <div className="clickable hover">
      <input
        type="checkbox"
        value={entry._id}
        onClick={handleCheck}
        style={{ display: checkboxDisplay, marginRight: "0.5rem" }}
      />
      <span className="entry" onClick={e => onClick(e, entry)}>
        {fillTemplate(entry)}
      </span>
    </div>
  );
};

export default Entry;
