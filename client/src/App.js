import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/Helpers/PrivateRoute';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {CreateCommunity} from "./pages/Community";
import Nav from './components/NavHome'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function App(props) {
  const classes = useStyles();
  return (
    <Router>
        <div className={classes.root}>
            <Route component={() => <Nav />} />
            <PrivateRoute exact path="/" component={Profile} />
            <Route path="/login" component={CreateCommunity} />
            <Route path="/profile" component={Profile} />
        </div>
    </Router>
  );
}

export { App };
