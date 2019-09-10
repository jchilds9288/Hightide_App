/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ThumbDown from '@material-ui/icons/ThumbDown';


import Title from '../Profile/Title';

import { AddTask } from '../../components/Form';

const styles = theme => ({
  root: {
    flex: 1,
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
    marginTop: theme.spacing(3),
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
});


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const { data: userTasks } = await axios.get(`/api/user/${'5d4497175b7a5c2b0e396349'}/tasks`);
    const formattedTasks = userTasks.map((task, i) => {
      return {
        id: task._id,
        date: task.created,
        task: task.title,
        pool: task.pool,
        points: task.points,
      };
    });
    this.setState({ tasks: formattedTasks });
  }

  async fetchTasks() {
    const { data: userTasks } = await axios.get(`/api/user/${'5d4497175b7a5c2b0e396349'}/tasks`);
  //  console.log(`tasks!: ${JSON.stringify(userTasks)}`)
    const formattedTasks = userTasks.map((task, i) => {
      return {
        id: task._id,
        date: task.created,
        task: task.title,
        pool: task.pool,
        points: task.points,
      };
    });
    this.setState({ tasks: formattedTasks });
  }

  updateTasks(task) {
    this.setState((state) => {
      const newTask = {
        id: task._id,
        date: task.created,
        task: task.title,
        pool: task.pool,
        points: task.points,
      };
      const userTasks = state.tasks.concat(newTask);

      return { tasks: userTasks };
    });
  }

  async sendTask(task) {
    const userID = '5d4497175b7a5c2b0e396349';

    const { data: newTask } = await axios.post(`/api/user/${userID}/tasks`, task);
    console.log(JSON.stringify(newTask))
    this.updateTasks(newTask);

  }

  async deleteTask(taskID) {
    const userID = '5d4497175b7a5c2b0e396349';

    const { data: newTask } = await axios.delete(`/api/user/${userID}/tasks/${taskID}`);
    console.log(JSON.stringify(newTask))
    await this.fetchTasks();

  }

  render() {
    const { classes } = this.props;
    const {
      tasks,
    } = this.state;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>

            <AddTask handleSave={this.sendTask.bind(this)} />

            <Grid container spacing={3}>

              <Grid item xs={12}>

                <Title>My Saved Tasks</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Added</TableCell>
                      <TableCell>Task</TableCell>
                      <TableCell>Pool</TableCell>
                      <TableCell align="right">Points</TableCell>
                      <TableCell align="right">Admin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      tasks.map((row) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.task}</TableCell>
                            <TableCell>{row.pool}</TableCell>
                            <TableCell align="right">{row.points}</TableCell>
                            <TableCell align="right">
                              <Fab
                                onClick={() => this.deleteTask(row.id)}
                                size="small"
                                color="secondary"
                                aria-label="add"
                                className={classes.margin}
                              >
                                <ThumbDown />
                              </Fab>
                            </TableCell>

                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>

              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
