import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import NavBar from "./components/pageComponents/nav";
import Collections from "./components/collections";
import Entries from "./components/entries";
import NewEntry from "./components/forms/newEntry";
import Edit from "./components/forms/edit";
import Register from "./components/forms/register";
import Login from "./components/forms/login";
import ProtectedRoute from "./components/protectedRoute";
import Landing from "./components/landing";
import NewStyle from "./components/forms/newStyle";
import Styles from "./components/styles";
import ErrorBoundary from "./components/errorBoundary";

import auth from "./services/authService";
import axios from "axios";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, error => {
  console.log(error.message);
  return Promise.reject(error);
});

class App extends Component {
  state = {
    userId: null
  };
  componentDidMount() {
    auth.setUser(this);
  }

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <NavBar user={this.state.userId} />
          <Switch>
            <Route path="/entries/:entryId/edit" component={Edit} />
            <Route path="/entries/new" exact component={NewEntry} />
            <ProtectedRoute path="/entries" component={Entries} />
            <Route
              path="/collections/:collectionId/new-entry"
              component={NewEntry}
            />
            <ProtectedRoute path="/collections" exact component={Collections} />
            <ProtectedRoute path="/styles/:id/edit" component={NewStyle} />
            <ProtectedRoute path="/styles/new" component={NewStyle} />
            <ProtectedRoute path="/styles" component={Styles} />
            <Route path="/users" component={Register} />
            <Route path="/auth" component={Login} />
            <Route path="/" component={Landing} />
          </Switch>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
