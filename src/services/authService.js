import jwtDecode from "jwt-decode";

const tokenKey = "token";

function login(value) {
  localStorage.setItem(tokenKey, value);
}

function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function userIsLoggedIn() {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    return true;
  } else {
    return false;
  }
}
function setUser(component) {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    const { _id: userId } = jwtDecode(jwt);
    component.setState({ userId: userId });
  } else {
    component.setState({ userId: null });
  }
}

export default {
  login,
  logout,
  getJwt,
  userIsLoggedIn,
  setUser
};
