import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../images/signin.jpg'; // Import using relative path
import { BareLogin } from '../Login';
import { SignUp } from '../SignUp';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}));

export default function Home(props) {
  const classes = useStyles();
  console.log(`did i get props: ${JSON.stringify(props)}`)

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
        { props.location.pathname === '/Signup' ? <SignUp /> : <BareLogin /> }
    </Grid>
  );
}
