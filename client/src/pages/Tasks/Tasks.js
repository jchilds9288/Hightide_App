/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

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
  taskBubble: {
    marginTop: theme.spacing(2),
    width: '175px',
    height: '175px',
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
  blueSelect: {
    backgroundColor: '#3f51b5',
    '&:hover': {
      background: '#7f8bcb',
    },
    color: 'white',
  },
  blueDeselect: {
    backgroundColor: 'white',
    '&:hover': {
      background: '#7f8bcb',
    },
    color: '#3f51b5',
    border: '6px solid #3f51b5',
  },
  yellowSelect: {
    backgroundColor: '#ffd344',
    '&:hover': {
      background: '#ffe386',
    },
    color: 'white',
  },
  yellowDeselect: {
    backgroundColor: 'white',
    '&:hover': {
      background: '#ffe386',
    },
    color: '#ffd344',
    border: '6px solid #ffd344',
  },
  redSelect: {
    backgroundColor: '#da413c',
    '&:hover': {
      background: '#f27773',
    },
    color: 'white',
  },
  redDeselect: {
    backgroundColor: 'white',
    '&:hover': {
      background: '#f27773',
    },
    color: '#da413c',
    border: '6px solid #da413c',
  },
  greenSelect: {
    backgroundColor: '#26a24a',
    '&:hover': {
      background: '#55c776',
    },
    color: 'white',
  },
  greenDeselect: {
    backgroundColor: 'white',
    '&:hover': {
      background: '#55c776',
    },
    color: '#26a24a',
    border: '6px solid #26a24a',
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

componentDidMount() {
    console.log('asdfasdfasdf')
    axios.get(`/api/user/${this.props.id}/tasks/round`)
      .then((userTasks) => {
        console.log('aaa')
        console.log(`tasks!: ${JSON.stringify(userTasks)}`)
        const { data } = userTasks;
      //  debugger;
        const formattedTasks = this.formatTasks(data)
      //  debugger;
        this.setState({ tasks: formattedTasks });
      });

  }

  formatTasks(tasks) {
    const { classes } = this.props;
    const socialClass = clsx(classes.taskBubble, classes.blue);
    const healthClass = clsx(classes.taskBubble, classes.yellow);
    const emotionClass = clsx(classes.taskBubble, classes.red);
    const happyClass = clsx(classes.taskBubble, classes.green);

    const classMapper = {};
    tasks.forEach((task, i) => {
      const poolTask = {
        id: i,
        date: task.created,
        task: task.title,
        points: task.points,
        completed: task.completed,
      };
      if (classMapper[task.pool]) {
        classMapper[task.pool].push(poolTask);
      } else {
        classMapper[task.pool] = [poolTask];
      }
    });
    return classMapper;
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

  async sendTask(task) {
    console.log(`title: ${task.task}, completed: ${task.completed}`)
    const { data: { tasks: newTasks } } = await axios.post(`/api/user/${'5d4497175b7a5c2b0e396349'}/tasks/round`, { title: task.task, completed: task.completed });
    //console.log(JSON.stringify(newTasks))
    newTasks.forEach((returnedTask) => {
      //console.log({ title: task.title, completed: task.completed});
        if (task.task === returnedTask.title) {
          console.log({ title: returnedTask.title, completed: returnedTask.completed});
        }
    })
    //this.handleSave(newTask);
    const formattedTasks = this.formatTasks(newTasks)
    this.setState({ tasks: formattedTasks });
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
    const socialClass = clsx(classes.taskBubble, classes.blue);
    const healthClass = clsx(classes.taskBubble, classes.yellow);
    const emotionClass = clsx(classes.taskBubble, classes.red);
    const happyClass = clsx(classes.taskBubble, classes.green);
    const colors = ['blue', 'yellow', 'red', 'green'];

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={0}>
              {Object.keys(this.state.tasks).sort().map((poolTitle, i) => {
                return (
                  <Grid item xs={3}>
                    <Grid container spacing={0}>

                      <Grid item xs={12}>
                        <Typography className={classes.titles} variant="h4" gutterBottom>
                          {poolTitle}
                        </Typography>
                      </Grid>

                      {this.state.tasks[poolTitle].map((task) => {
                        const taskColor = colors[i];
                        const taskState = task.completed ? 'Select' : 'Deselect';
                        return (
                          <Grid item xs={12}>
                            <Fab
                              onClick={() => this.sendTask(task)}
                              size="small"
                              color="secondary"
                              aria-label="add"
                              className={clsx(classes.taskBubble, classes[`${taskColor}${taskState}`])}
                            >
                              <Typography variant="h5" gutterBottom>
                                {task.task}
                              </Typography>
                            </Fab>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid>
                )
              })}

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
