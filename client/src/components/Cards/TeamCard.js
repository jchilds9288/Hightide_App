/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TeamPhoto from '../../pages/Community/TeamPhoto';
import TeamPhotoEmpire from '../../pages/Community/TeamPhotoEmpire';


const components = {
  rebels: TeamPhoto,
  empire: TeamPhotoEmpire,
};

const styles = theme => ({
  root: {
    display: 'flex',
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '100%',
    border: 'none',
    boxShadow: 'none',
  },
  teamPointsRed: {
    textAlign: 'center',
    color: 'red',
    fontFamily: 'Russo One, sans-serif',
  },
  teamPointsTitle: {
    textAlign: 'center',
    fontFamily: 'Russo One, sans-serif',
  },
  teamCard: {
    margin: theme.spacing(4),
  },

});


class TeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes, score, photo } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const Photo = components[photo];
    return (
      <Paper className={classes.teamCard}>
        <Grid container spacing={3}>

          <Grid item xs={5}>
            <Paper className={fixedHeightPaper}>
              <Photo className={fixedHeightPaper} />
              <Typography className={classes.teamPointsTitle} variant="h5" gutterBottom>
              Empire Squad
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={7}>
            <Grid container spacing={1}>

              <Grid item xs={6}>
                <Typography className={classes.teamPointsTitle} variant="h5" gutterBottom>
                  Total Points
                </Typography>
                <Typography className={classes.teamPointsRed} variant="h4" gutterBottom>
                  528
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography className={classes.teamPointsTitle} variant="h5" gutterBottom>
                  Daily Progress
                </Typography>
                <Typography className={classes.teamPointsRed} variant="h4" gutterBottom>
                100%
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.teamPointsTitle} variant="h2" gutterBottom>
                  Today&apos;s Score
                </Typography>
                <Typography className={classes.teamPointsRed} variant="h1" gutterBottom>
                  10/15
                </Typography>
              </Grid>

            </Grid>
          </Grid>


        </Grid>
      </Paper>
    );
  }
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired,
  photo: PropTypes.string.isRequired,
};

export default withStyles(styles)(TeamCard);
