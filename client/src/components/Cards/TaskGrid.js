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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  margin: {
    marginTop: theme.spacing(2),
    width: '150px',
    height: '150px',
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

const formatPools = (tasks) => {
  if (!tasks) { return null; }
  const pools = {};
  tasks.forEach((task) => {
    if (pools[task.pool]) {
      pools[task.pool].push(task);
    } else {
      pools[task.pool] = [task];
    }
  })
}

class TasksGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSave(task) {
    const { handleSave } = this.props;
    handleSave(task);
  }


  formattedTasks(userTasks) {
    if (!userTasks) { return null; }
    const { classes } = this.props;
    const newTasks = userTasks.map((task, i) => {
      return {
        id: i,
        date: task.created,
        task: task.title,
        pool: '',
        points: task.points,
        class: clsx(classes.margin, classes.blue),
      };
    });
    return newTasks;
  };

  render() {
    const { classes } = this.props;
    const socialClass = clsx(classes.margin, classes.blue);
    const healthClass = clsx(classes.margin, classes.yellow);
    const emotionClass = clsx(classes.margin, classes.red);
    const happyClass = clsx(classes.margin, classes.green);

    const myTasks = this.formattedTasks(this.props.tasks)
    const pooledTasks = formatPools(myTasks);
    return (
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
            myTasks && myTasks.map((task) => {
              return (
                <Grid item xs={3}>
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    className={task.class}
                  >
                    <Typography className={classes.taskTitle} variant="h5" gutterBottom>
                      {task.task}
                    </Typography>
                  </Fab>
                </Grid>
              )
            })
          }

        </Grid>

      </Container>
    );
  }
}

TasksGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TasksGrid);
