/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


import { LoginTextField } from '../../pages/Login/loginTextField';
import { SelectPoints } from '.';

const styles = theme => ({
  classmatesBtn: {
    margin: theme.spacing(0.5),
  },
  classmatesBtnContainer: {
    marginRight: theme.spacing(1),
    textAlign: 'center',
  },
  container: {
    maxHeight: '50px',
  },
});


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredTask: 'testTask',
      enteredPool: 'Studies',
      enteredPoints: 1,
    };
  }

  updateTask(e) {
    this.setState({ enteredTask: e.target.value });
  }

  updatePoints(e) {
    this.setState({ enteredPoints: e });
  }

  updatePool(e) {
    this.setState({ enteredPool: e });
  }

  async sendTask() {
    const {
      enteredTask,
      enteredPool,
      enteredPoints,
    } = this.state;
    const { handleSave } = this.props;
    const obj = {
      title: enteredTask,
      points: enteredPoints,
      pool: enteredPool,
    };
    handleSave(obj);
  }

  render() {
    const { classes } = this.props;
    const { enteredTask, enteredPool, enteredPoints } = this.state;
    return (
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <LoginTextField
            value={enteredTask}
            onChange={this.updateTask.bind(this)}
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
    );
  }
}

AddTask.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddTask);
