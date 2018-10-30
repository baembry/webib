export const getLabel = camelCase => {
  let label = camelCase.replace(/[A-Z]/g, function(char) {
    return " " + char;
  });
  return label.slice(0, 1).toUpperCase() + label.slice(1);
};

export const getName = label => {
  let name = label[0].toLowerCase() + label.slice(1);
  name = name.replace(/[\W]/g, "");
  return name;
};

export default { getLabel };
