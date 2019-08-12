/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import moment from 'moment';
import _ from 'underscore';

import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { SelectPoints, CheckBoxGroup } from '../../components/Form';

import Title from '../Profile/Title';
import { LoginTextField } from '../Login/loginTextField';


const styles = theme => ({
  root: {
    flex: 1,
    textAlign: 'center',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  margin: {
    marginTop: theme.spacing(2),
    width: '150px',
    height: '150px',
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
  badgesContainer: {
    height: 240,
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  titles: {
    textAlign: 'center',
    fontFamily: 'Russo One, sans-serif',
  },
  blue: {
    backgroundColor: '#3f51b5',
    '&:hover': {
      background: '#7f8bcb',
    },
  },
  yellow: {
    backgroundColor: '#ffd344',
    '&:hover': {
      background: '#ffe386',
    },
  },
  red: {
    backgroundColor: '#da413c',
    '&:hover': {
      background: '#f27773',
    },
  },
  green: {
    backgroundColor: '#26a24a',
    '&:hover': {
      background: '#55c776',
    },
  },
});


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      enteredTask: '',
      enteredPoints: 3,
      enteredPool: 'General',
    };
  }

  async componentDidMount() {
    const { data: userTasks } = await axios.get(`/api/user/${'5d4497175b7a5c2b0e396349'}/tasks`);
  //  console.log(`tasks!: ${JSON.stringify(userTasks)}`)
    const formattedTasks = userTasks.map((task, i) => {
      return {
        id: i,
        date: task.created,
        task: task.title,
        pool: '',
        points: task.points,
      };
    });
    this.setState({ tasks: formattedTasks });
  }

  handleSave(task) {
    this.setState((state) => {
      const newTask = {
        id: state.length,
        date: task.created,
        task: task.title,
        pool: 'this is not done yet',
        points: task.points,
      };
      const userTasks = state.tasks.concat(newTask);

      return { tasks: userTasks };
    });
  }

  async sendTask() {
    const { enteredTask, enteredPool, enteredPoints} = this.state;
    const userID = '5d4497175b7a5c2b0e396349';
    const obj = {
      user: userID,
      title: enteredTask,
      points: enteredPoints,
    };

    const { data: newTask } = await axios.post(`/api/user/${'5d4497175b7a5c2b0e396349'}/tasks`, obj);
    console.log(JSON.stringify(newTask))
    this.handleSave(newTask);

  }

  updateUser(e) {
    console.log('hhey')
    this.setState({ enteredTask: e.target.value });
  }

  updatePoints(e) {
    this.setState({ enteredPoints: e });
  }

  updatePool(e) {
    this.setState({ enteredPool: e });
  }

  addTask() {
    const {
      tasks,
      enteredTask,
      enteredPool,
      enteredPoints,
    } = this.state;

    this.setState((state) => {
      const newTask = {
        id: tasks.length,
        date: moment().format(),
        task: enteredTask,
        pool: enteredPool,
        points: enteredPoints,
      };
      const userTasks = state.tasks.concat(newTask);

      return { tasks: userTasks };
    });
  }

  render() {
    const { classes } = this.props;
    const socialClass = clsx(classes.margin, classes.blue);
    const healthClass = clsx(classes.margin, classes.yellow);
    const emotionClass = clsx(classes.margin, classes.red);
    const happyClass = clsx(classes.margin, classes.green);

    const tasks = [
      { name: 'Task 1', class: socialClass },
      { name: 'Task 2', class: healthClass },
      { name: 'Task 3', class: emotionClass },
      { name: 'Task 4', class: happyClass },

      { name: 'Task 1', class: socialClass },
      { name: 'Task 2', class: healthClass },
      { name: 'Task 3', class: emotionClass },
      { name: 'Task 4', class: happyClass },

      { name: 'Task 1', class: socialClass },
      { name: 'Task 2', class: healthClass },
      { name: 'Task 3', class: emotionClass },
      { name: 'Task 4', class: happyClass },

      { name: 'Task 1', class: socialClass },
      { name: 'Task 2', class: healthClass },
      { name: 'Task 3', class: emotionClass },
      { name: 'Task 4', class: happyClass },

    ];

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>

              <Grid item xs={3}>
                <Typography className={classes.titles} variant="h4" gutterBottom>
                  Social
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography className={classes.titles} variant="h4" gutterBottom>
                  Health
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography className={classes.titles} variant="h4" gutterBottom>
                  Emotion
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography className={classes.titles} variant="h4" gutterBottom>
                  Happy
                </Typography>
              </Grid>

            </Grid>

            <Grid container spacing={3}>


              {
                tasks.map((task) => {
                  return (
                    <Grid item xs={3}>
                      <Fab
                        onClick={() => this.sendTask()}
                        size="small"
                        color="secondary"
                        aria-label="add"
                        className={task.class}
                      >
                        <Typography className={classes.taskTitle} variant="h5" gutterBottom>
                          {task.name}
                        </Typography>
                      </Fab>
                    </Grid>
                  )
                })
              }

            </Grid>

          </Container>
        </main>
      </div>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tasks);
