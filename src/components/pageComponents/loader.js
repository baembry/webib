import React from "react";

const Loader = ({ loading }) => {
  return loading ? <div className="loader" /> : null;
};

export default Loader;
