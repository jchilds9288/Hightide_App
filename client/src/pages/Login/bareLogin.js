import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API';

import { LoginTextField } from './loginTextField';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function MadeWithLove() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Built with love by the Hightide Team '}
    </Typography>
  );
}

function Login(props) {

  const classes = useStyles();

  const [loginForm, setValues] = useState({
    email: '',
    password: '',
  });

  const updateField = (e) => {
    setValues({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`sending ${JSON.stringify(loginForm)}`)
  //  const { history } = this.props;
    API.login(loginForm)
      .then((result) => {
        console.log('i have returned')
        console.log(JSON.stringify(result));
        props.history.push('/profile');
      })
      .catch((err) => {
        console.log(`uh oh: ${err}`)
      });
  };

  const handleLogin = () => {
    console.log('hi');
    API.testLogin()
      .then((result) => {
        console.log('i have returned from the test')
        console.log(JSON.stringify(result));
      })
  }

  return (
    <div className="col-sm-8 col-sm-offset-2">
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome To Tidepool
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <LoginTextField value={loginForm.email} onChange={updateField} id="email" label="Email Address" name="email" autoComplete="email" />
            <LoginTextField value={loginForm.password} onChange={updateField} id="password" label="Password" name="password" type="password" />

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
            <Button onClick={() => handleLogin()} fullWidth variant="contained" color="primary" className={classes.submit}>
              Test Login
            </Button>
            <br />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </div>
  );
}

export default withRouter(Login);
