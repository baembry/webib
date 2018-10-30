const getLabel = camelCase => {
  let label = camelCase.replace(/[A-Z]/, function(char) {
    return " " + char;
  });
  return label.slice(0, 1).toUpperCase() + label.slice(1);
};

export { getLabel };
