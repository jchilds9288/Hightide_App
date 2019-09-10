/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { AddTask, TeamForm } from '../../components/Form';
import TasksGrid from '../../components/Cards/TaskGrid';
import TeamCard from '../../components/Cards/TeamCard';
import TeamPhoto from '../Community/TeamPhoto';

import CreateCommunity from '../Community/CreateCommunity';


function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '10%',
  },
  classmatesBtn: {
    margin: theme.spacing(0.5),
  },
  classmatesBtnContainer: {
    marginRight: theme.spacing(1),
    textAlign: 'center',
  },
  classmatesHeaderContainer: {
    marginRight: theme.spacing(1),
    textAlign: 'center',
    minHeight: '48px',
    color: '#fff',
    backgroundColor: '#3f51b5',
  },
  classmatesList: {
    maxHeight: '500px',
  },
  container: {
    maxHeight: '50px',
  },
  classmatesHeader: {
    minHeight: '48px',
    margin: 'auto',
    padding: '13px',
  },
  classmatesHeaderText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    lineHeight: '1.75',
    whiteSpace: 'normal',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    fontSize: '0.8125rem',
  },
});

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      users: [],
      selectedUser: {},
    };
  }

  async componentDidMount() {
    const { data: users } = await axios.get('/api/user', {});
    const tasks = await this.getUserTasks(users[0]);
    console.log('users: ', JSON.stringify(users));
    console.log('tasks: ', JSON.stringify(tasks));

    this.setState({ users, selectedUser: users[0], tasks });
  }

  async getUserTasks(user) {
    const { data: tasks } = await axios.get(`/api/user/${user.id}/tasks`);
    console.log('tasks: ', JSON.stringify(tasks))
    return tasks;
  }

  handleChange(e, value) {
    this.setState({ value });
  }

  async switchUser(e) {
    console.log(`switching to ${e}`)
    const { data: tasks } = await axios.get(`/api/user/${e.id}/tasks`);
    this.setState({ selectedUser: e, tasks })
  }

  async handleTaskSave(stuff) {
    const { data: newTask } = await axios.post(`/api/user/${this.state.selectedUser._id}/tasks`, stuff);
    console.log(JSON.stringify(newTask))
    const currentTasks = this.state.tasks
    currentTasks.push(newTask);
    this.setState(currentTasks);
  }

  async handleTeamSave(e) {

  }

  render() {
    const { classes } = this.props;
    const {
      value,
      users,
      selectedUser,
      tasks,
    } = this.state;
    return (
      <div className={classes.root}>


        <Grid container spacing={3} className={classes.container}>

          <Grid item xs={3}>

            <AppBar position="static">

              <div className={classes.classmatesHeader}>
                <Typography className={classes.classmatesHeaderText} variant="h5">
                  Participants
                </Typography>
              </div>
            </AppBar>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              aria-label="Vertical tabs example"
              className={classes.classmatesList}
            >

              { users.map((item) => {
                return (
                  <Grid item xs={12} className={classes.classmatesBtnContainer}>
                    <Fab
                      onClick={() => this.switchUser(item)}
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="add"
                      className={classes.classmatesBtn}
                    >
                      {item.email}
                    </Fab>
                  </Grid>
                );
              })
              }
            </Tabs>
          </Grid>

          <Grid item xs={9}>
            <AppBar position="static">

              <Tabs value={value} onChange={this.handleChange.bind(this)} aria-label="simple tabs example">
                <Tab label="Task Management" {...a11yProps(0)} />
                <Tab label="Team Statistics" {...a11yProps(1)} />
                <Tab label="Team Management" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Typography className={classes.classmatesHeaderText} variant="h5">
                {selectedUser.email}
              </Typography>
              <Grid container spacing={3}>

                <AddTask handleSave={this.handleTaskSave.bind(this)} />
                <TasksGrid tasks={tasks} />

              </Grid>

            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
              <TeamForm
                handleSave={this.handleTeamSave.bind(this)}
              />
            </TabPanel>
          </Grid>

        </Grid>

      </div>
    );
  }
}

Teacher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teacher);
