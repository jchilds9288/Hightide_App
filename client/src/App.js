import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { PrivateRoute } from './components/Helpers/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { BareLogin } from './pages/Login';
import { Teams } from './pages/Community';
import Admin, { Teacher } from './pages/Account';
import Tasks from './pages/Tasks';
import Nav from './components/NavHome'
import { SignUp } from './pages/SignUp';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Route component={() => <Nav />} />
        <PrivateRoute exact path="/" component={Profile} />
        <Route path="/login" component={BareLogin} />
        <Route path="/profile" component={Profile} />
        <Route path="/teams" component={Teams} />
        <Route path="/admin" component={Admin} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/teacher" component={Teacher} />
        <Route path="/register" component={SignUp} />
      </div>
    </Router>
  );
}

export { App };
