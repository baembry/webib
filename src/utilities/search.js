import axios from 'axios';

export const search = (entries, data) => {
  const fields = Object.keys(data);
  let filtered = [...entries];
  fields.forEach(field => {
    if (data[field] && typeof data[field] === 'string') {
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
      typeof entry[key] === 'string' &&
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

function matches(firstObject, secondObject) {
  let obj1 = { ...firstObject };
  let obj2 = { ...secondObject };

  //ignore id's
  delete obj1._id;
  delete obj2._id;
  delete obj1.userId;
  delete obj2.userId;

  if (Object.keys(obj1).length === 0) {
    if (Object.keys(obj2).length === 0) {
      return true;
    } else {
      // console.log(`Mismatch. Obj1 has more keys than obj2.`);
      // console.log(obj1);
      // console.log(obj2);
      return false;
    }
  }
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      // console.log(`Mismatch. Obj1 has key ${key}, but obj2 does not.`);
      // console.log(obj1);
      // console.log(obj2);
      return false;
    }
    if (typeof obj1[key] === 'string' && obj1[key] !== obj2[key]) {
      // console.log(
      //   `Mismatch. Obj1 contains value ${
      //     obj1[key]
      //   } at ${key}, but obj2 contains the value ${obj2[key]} at ${[key]}.`
      // );
      // console.log(obj1);
      // console.log(obj2);
      return false;
    }
    if (typeof obj1[key] === 'object') {
      let theyMatch = matches(obj1[key], obj2[key]);
      if (!theyMatch) {
        return false;
      }
    }
  }
  return true;
}

function hasMatch(obj, arrayOfObjects) {
  let searchArray = [...arrayOfObjects];
  if (searchArray.length === 0) {
    return false;
  }
  let comparisonObject = searchArray.pop();
  if (matches(obj, comparisonObject)) {
    return true;
  } else {
    return hasMatch(obj, searchArray);
  }
}

//this one is not very efficient. Could improve with pop and recursion
export const eliminateDuplicates = arrayOfObjects => {
  let clone = [...arrayOfObjects];
  let result = [];
  clone.forEach((element, i) => {
    if (!hasMatch(element, clone.slice(i + 1))) {
      result.push(element);
    } else {
    }
  });
  return result;
};

export const handleSearch = async function(entry) {
  try {
    console.log('Searching...', entry);
    const results = await axios.post('/entries/search', {
      data: entry,
    });
    console.log('Search results: ', results);
    return results.data;
  } catch (error) {
    console.error(error);
  }
};

export default { search, eliminateDuplicates };
