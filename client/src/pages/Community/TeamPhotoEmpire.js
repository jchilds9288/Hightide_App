/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Image from '../../images/empire.png'; // Import using relative path

const useStyles = makeStyles({
  profileCard: {
    backgroundColor: 'white',
    flex: 1,
    backgroundImage: `url(${Image})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    border: 'none',
    boxShadow: 'none',
  }
});

export default function TeamPhoto() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.profileCard} />
    </React.Fragment>
  );
}
