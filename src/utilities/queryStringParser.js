//input like: "?key=val&key=val..."
export const parse = str => {
  const arr = str.split("=");
  const key = arr[0].slice(1);
  const val = arr[1];
  return { [key]: val };
};
