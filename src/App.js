import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import "./App.css";

//components
import NavBar from './components/pageComponents/nav';
import Collections from './components/collections';
import Entries from './components/entries';
import NewEntry from './components/forms/newEntry';
import Edit from './components/forms/edit';
import Register from './components/forms/register';
import ProtectedRoute from './components/protectedRoute';
import Landing from './components/landing';
import NewStyle from './components/forms/newStyle';
import Styles from './components/styles';
import ErrorBoundary from './components/errorBoundary';
import FlashMessage from './components/pageComponents/flashMessage';
import Loader from './components/pageComponents/loader';

import { flashMessage } from './utilities/flash';

import auth from './services/authService';
import axios from 'axios';

axios.defaults.headers.common['x-auth-token'] = auth.getJwt();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, error => {
  return Promise.reject(error);
});

class App extends Component {
  state = {
    userId: null,
    flashData: { showFlash: false, message: '', alertClass: '' },
    loading: true,
  };

  componentDidMount() {
    auth.setUser(this);
    this.setState({ loading: false });
  }

  flashMessage = flashMessage.bind(this);
  toggleLoading = () => {
    const loading = this.state.loading;
    this.setState({ loading: !loading });
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <NavBar user={this.state.userId} />
          <Switch>
            <ProtectedRoute
              path="/entries/:entryId/edit"
              component={Edit}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute
              path="/entries/new"
              component={NewEntry}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute
              path="/entries"
              component={Entries}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute
              path="/collections/:collectionId/new-entry"
              component={NewEntry}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute
              path="/collections"
              exact
              component={Collections}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute
              path="/styles/:id/edit"
              component={NewStyle}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute
              path="/styles/new"
              component={NewStyle}
              flashMessage={this.flashMessage}
              toggleLoading={this.toggleLoading}
            />
            <ProtectedRoute path="/styles" component={Styles} />
            />
            <Route
              path="/users"
              render={() => (
                <Register
                  flashMessage={this.flashMessage}
                  toggleLoading={this.toggleLoading}
                />
              )}
            />
            <Route
              path="/auth"
              render={() => (
                <Register
                  flashMessage={this.flashMessage}
                  toggleLoading={this.toggleLoading}
                />
              )}
            />
            <Route
              path="/"
              render={() => (
                <Landing
                  flashMessage={this.flashMessage}
                  toggleLoading={this.toggleLoading}
                />
              )}
            />
          </Switch>
          <FlashMessage flashData={this.state.flashData} />
          <Loader loading={this.state.loading} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
