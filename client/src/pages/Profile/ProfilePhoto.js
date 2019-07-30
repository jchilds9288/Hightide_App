/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Title from './Title';
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
  },
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
