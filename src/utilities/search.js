const search = (entries, data) => {
  const fields = Object.keys(data);
  let filtered = [...entries];
  fields.forEach(field => {
    if (data[field] && typeof data[field] === "string") {
      filtered = filtered.filter(entry => {
        return entry[field]
          .toLowerCase()
          .trim()
          .includes(data[field].toLowerCase().trim());
      });
    } else if (Array.isArray(data[field])) {
      const arr = data[field];
      arr.forEach((obj, i) => {
        let keys = Object.keys(obj);
        keys.forEach(key => {
          if (obj[key]) {
            filtered = filtered.filter(entry => {
              return entry[field][i] && entry[field][i][key]
                ? entry[field][i][key]
                    .toLowerCase()
                    .trim()
                    .includes(data[field][i][key].toLowerCase().trim())
                : true;
            });
          }
        });
      });
    }
  });
  return filtered;
};

export const contains = (entry, term) => {
  //returns true if entry contains term anywhere
  //refactor: get innermost values of entry
  //return innermost includes term
  let result = false;
  const keys = Object.keys(entry);
  keys.forEach(key => {
    if (
      typeof entry[key] === "string" &&
      entry[key].toLowerCase().includes(term.toLowerCase())
    ) {
      result = true;
    }
    if (Array.isArray(entry[key])) {
      entry[key].forEach(obj => {
        if (contains(obj, term)) {
          result = true;
        }
      });
    }
  });
  return result;
};
export default search;
