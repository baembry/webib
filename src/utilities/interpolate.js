const interpolate = function(string, params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${string}\`;`)(...vals);
};

export default interpolate;
