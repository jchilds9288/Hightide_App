/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import moment from 'moment';
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


// Generate Order Data
function createData(id, date, task, givenTo, pool, points) {
  return { id, date, task, givenTo, pool, points };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Hung up towel', 'Chores', 1),
  createData(1, '16 Mar, 2019', 'Woke up early', 'Productivity', 5),
  createData(2, '16 Mar, 2019', 'Made breakfast', 'Self Care', 3),
  createData(3, '16 Mar, 2019', 'Worked out', 'Self Care', 3),
  createData(4, '15 Mar, 2019', 'Phonecall with friend', 'Friendship', 5),
];

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
    const {
      tasks,
      enteredPoints,
      enteredTask,
      enteredPool,
    } = this.state;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>

              <Grid item xs={7}>
                <LoginTextField
                  value={enteredTask}
                  onChange={this.updateUser.bind(this)}
                  id="task"
                  label="Add Task"
                  name="task"
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={2}>
                <SelectPoints
                  options={['Studies', 'Self Care', 'Friends', 'Relationship']}
                  title="Pool"
                  value={enteredPool}
                  handleChange={this.updatePool.bind(this)}
                />
              </Grid>

              <Grid item xs={2}>
                <SelectPoints
                  options={[1, 3, 5]}
                  title="Point Value"
                  value={enteredPoints}
                  handleChange={this.updatePoints.bind(this)}
                />
              </Grid>


              <Grid item xs={1}>
                <Fab
                  onClick={() => this.sendTask()}
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.margin}
                >
                  <AddIcon />
                </Fab>
              </Grid>

            </Grid>

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
