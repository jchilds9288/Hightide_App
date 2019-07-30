import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { FormTextField } from '../../components/Form';

import API from '../../utils/API';

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

const MadeWithLove = () => ((
  <Typography variant="body1" color="textSecondary" align="center">
    {'Built with love by the Hightide Team '}
  </Typography>
));

export default function SignUp() {
  const classes = useStyles();

  const [signUpForm, setValues] = useState({
    email: '',
    password: '',
  });

  const onFailure = (error) => {
    alert(error);
  };


  const updateField = (e) => {
    setValues({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.addUser(signUpForm)
      .then((result) => {
        console.log('i have returned', JSON.stringify(result));
      })
      .catch((err) => {
        console.log(`uh oh: ${err}`);
      });
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {'Let\'s Get Started!!'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <FormTextField value={signUpForm.email} onChange={updateField} id="email" label="Email Address" name="email" autoComplete="email" />
          <FormTextField value={signUpForm.password} onChange={updateField} id="password" label="Password" name="password" type="password" />

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up
          </Button>
          <br />
          <Box mt={5}>
            <MadeWithLove />
          </Box>
        </form>
      </div>
    </Grid>
  );
}
