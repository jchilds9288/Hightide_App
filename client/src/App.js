import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/Helpers/PrivateRoute';
import Home from "./pages/Home";
import Profile from "./pages/Profile";


class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={Profile} />
                                <Route path="/login" component={Profile} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export { App };
