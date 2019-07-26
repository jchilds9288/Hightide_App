/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Paper from '@material-ui/core/Paper';
import Image from '../../images/ches.jpg'; // Import using relative path

const useStyles = makeStyles({
  profileCard: {
    padding: '5px',
    backgroundColor: 'white',
    flex: 1,
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  }
});

export default function ProfilePhoto() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Welcome Back, Em!</Title>
      <Paper className={classes.profileCard} />

    </React.Fragment>
  );
}
