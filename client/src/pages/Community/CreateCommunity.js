/* eslint-disable react/forbid-prop-types */
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

import TextField from '@material-ui/core/TextField';
import { SelectPoints, CheckBoxGroup } from '../../components/Form';

import { LoginTextField } from '../Login/loginTextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: '80%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  margin: {
    margin: '21px 0px',
  },
  cancel: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  communityTitle: {
    color: '#f50057',
  },
  cancelBtn: {
    backgroundColor: 'red',
    margin: theme.spacing(1),
  },
  sendBtn: {
    margin: theme.spacing(1),
  },
}));

export default function CreateCommunity({ handleClose, handleSave }) {
  const classes = useStyles();
  const checkBoxLabels = [
    'Allow Hidden Tasks',
    'Make Group Private',
    'Allow \'You Won\'t\' Challenges',
  ];

  const [teamMembers, updateTeam] = useState([]);
  const [enteredUser, updateEnteredUser] = useState('');

  const [dailyPointVal, updateDailyPointVal] = useState(20);
  const [totalPointVal, updateTotalPointVal] = useState(500);
  const [teamName, updateTeamName] = useState(uuid());

  const updateDailyPoints = ((points) => {
    console.log(`updating to ${points}`)
    updateDailyPointVal(points);
  });

  const updateTotalPoints = ((points) => {
    console.log(`updating to ${points}`)
    updateTotalPointVal(points);
  });

  const handleUpdateTeamName = (e) => {
    updateTeamName(e.target.value);
  };

  const updateUser = (e) => {
    updateEnteredUser(e.target.value);
  };

  const checkUser = async (user) => {
    console.log(`checking for ${user}`)
    const { data: userSearch } = await axios.get('/api/user', {
      params: {
        email: user,
      }
    });
    return userSearch;
  }

  const addEntry = useCallback(async () => {
    const user = await checkUser(enteredUser);
    console.log(`isUser: ${JSON.stringify(user)}`);
    if (!user.length) {
      alert('sorry that user doesnt exist!')
      return;
    }
    const [newTeamMember] = user;
    console.log(`newTeamMember: ${JSON.stringify(newTeamMember)}`)
    updateTeam([...teamMembers, newTeamMember]);
    updateEnteredUser('');
  });

  const addTeam = async () => {
    const teamObj = {
      teamName,
      dailyGoal: dailyPointVal,
      roundGoal: totalPointVal,
      teamMembers,
    };
    console.log(JSON.stringify(teamObj));
    const newTeam = await axios.post('/api/team', teamObj);
    console.log(JSON.stringify(newTeam))
    handleSave(newTeam);
  };

  return (
    <>
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <Typography className={classes.communityTitle} variant="h3" gutterBottom>
              Create a Community
              </Typography>
              <Grid container spacing={3}>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <TextField
                      id="outlined-dense"
                      label="Team Name"
                      value={teamName}
                      className={clsx(classes.textField, classes.dense)}
                      margin="dense"
                      variant="outlined"
                      onChange={handleUpdateTeamName}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <SelectPoints options={[15, 20, 25]} title="Daily Point Value" value={dailyPointVal} handleChange={updateDailyPoints} />
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <SelectPoints options={[200, 250, 300, 350, 400]} title="Total Point Value" value={totalPointVal} handleChange={updateTotalPoints} />
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <CheckBoxGroup labels={checkBoxLabels} />
                  </Paper>
                </Grid>

                <Grid item xs={11}>
                  <LoginTextField value={enteredUser} onChange={updateUser} id="email" label="Team Member" name="email" autoComplete="username" />
                </Grid>

                <Grid item xs={1}>
                  <Fab onClick={() => addEntry('Friend')} size="small" color="secondary" aria-label="add" className={classes.margin}>
                    <AddIcon />
                  </Fab>
                </Grid>

                { teamMembers.map(member => ((
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>
                      {member.email}
                    </Paper>
                  </Grid>
                )))
              }

                <Grid item xs={12}>
                  <Button onClick={handleClose} variant="contained" color="primary" className={classes.cancelBtn}>
                    <CancelIcon className={clsx(classes.cancel, classes.iconSmall)} />
                          Cancel
                  </Button>

                  <Button onClick={() => addTeam()} variant="contained" color="primary" className={classes.sendBtn}>
                    <SendIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                          Create
                  </Button>
                </Grid>

              </Grid>
            </Paper>



          </Container>
        </main>
      </div>
    </>
  );
}

CreateCommunity.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};
