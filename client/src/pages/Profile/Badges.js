import React from 'react';
import Title from './Title';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Image from '../../images/ches.jpg'; // Import using relative path

import fireBadge from '../../images/fireBadge.jpg'; // Import using relative path
import eightyBadge from '../../images/80Badge.jpg'; // Import using relative path
import clockBadge from '../../images/clockBadge.jpg'; // Import using relative path
import runningBadge from '../../images/runningBadge.jpg'; // Import using relative path

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  fireBadge: {
    backgroundImage: `url(${fireBadge})`,
  },
  eightyBadge: {
    backgroundImage: `url(${eightyBadge})`,
  },
  clockBadge: {
    backgroundImage: `url(${clockBadge})`,
  },
  runningBadge: {
    backgroundImage: `url(${runningBadge})`,
  },
  badgeCard: {
    padding: '5px',
    backgroundColor: 'white',
    flex: 1,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: 70,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Badges() {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fireBadge = clsx(classes.fireBadge, classes.badgeCard);
  const eightyBadge = clsx(classes.eightyBadge, classes.badgeCard);
  const clockBadge = clsx(classes.clockBadge, classes.badgeCard);
  const runningBadge = clsx(classes.runningBadge, classes.badgeCard);

  return (
    <React.Fragment>
      <Title>Badges So Far</Title>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={fireBadge}/>
          </Grid>

          <Grid item xs={4}>
            <Paper className={eightyBadge}/>
          </Grid>

          <Grid item xs={4}>
            <Paper className={clockBadge}/>
          </Grid>

          <Grid item xs={4}>
            <Paper className={runningBadge}/>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.badgeCard}/>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.badgeCard}/>
          </Grid>

        </Grid>
    </React.Fragment>
  );
}
