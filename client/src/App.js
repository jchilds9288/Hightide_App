import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/Helpers/PrivateRoute';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {CreateCommunity} from "./pages/Community";


class App extends React.Component {
    render() {
        return (
          <Router>
              <div>
                  <PrivateRoute exact path="/" component={Profile} />
                  <Route path="/login" component={CreateCommunity} />
                  <Route path="/profile" component={Profile} />
              </div>
          </Router>
        );
    }
}

export { App };
