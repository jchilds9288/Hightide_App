import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';

import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import {SelectPoints} from '../../components/Form'
import {CheckBoxGroup} from '../../components/Form'
import Nav from '../../components/NavHome'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function CreateCommunity() {
  const classes = useStyles();
  const checkBoxLabels = [
    'Allow Hidden Tasks',
    'Make Group Private',
    'Allow \'You Won\'t\' Challenges'
  ];
  return (
    <div className={classes.root}>
    <Nav />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>


        <Grid item xs={12}>
            <TextField
              id="outlined-dense"
              label="Group Name"
              className={clsx(classes.textField, classes.dense)}
              margin="dense"
              variant="outlined"
            />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <SelectPoints title="Daily Point Value" />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <SelectPoints title="Total Point Value" />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CheckBoxGroup labels={checkBoxLabels}/>
          </Paper>
        </Grid>


      </Grid>
      </Container>
      </main>

    </div>
  );
}
