//input like: "?key=val&key=val..."
// export const parse = str => {
//   const arr = str.split('=');
//   const key = arr[0].slice(1);
//   const val = arr[1];
//   return { [key]: val };
// };

const parseKeyValueString = function(keyValueString) {
  const arr = keyValueString.split('=');
  return { [arr[0]]: arr[1] };
};

export const parseQueryString = function(str) {
  str = str.slice(1);
  const keyValues = str.split('&');
  let queryParams = {};
  for (let keyValue of keyValues) {
    Object.assign(queryParams, parseKeyValueString(keyValue));
  }
  return queryParams;
};
