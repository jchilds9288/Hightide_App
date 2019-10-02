/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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


class TasksGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSave(task) {
    const { handleSave } = this.props;
    handleSave(task);
  }


  // formattedTasks(userTasks) {
  //   if (!userTasks) { return null; }
  //   const { classes } = this.props;
  //   const newTasks = userTasks.map((task, i) => {
  //     return {
  //       id: i,
  //       date: task.created,
  //       task: task.title,
  //       pool: '',
  //       points: task.points,
  //       class: clsx(classes.margin, classes.blue),
  //     };
  //   });
  //   return newTasks;
  // };

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

  render() {
    const { classes } = this.props;
    const colors = ['blue', 'yellow', 'red', 'green'];

    const myTasks = this.formatTasks(this.props.tasks)
    //const pooledTasks = formatPools(myTasks);
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={0}>
          {Object.keys(myTasks).sort().map((poolTitle, i) => {
            return (
              <Grid item xs={3}>
                <Grid container spacing={0}>

                  <Grid item xs={12}>
                    <Typography className={classes.titles} variant="h4" gutterBottom>
                      {poolTitle}
                    </Typography>
                  </Grid>

                  {myTasks[poolTitle].map((task) => {
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
    );
  }
}

TasksGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TasksGrid);
