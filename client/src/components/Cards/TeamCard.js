/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TeamPhoto from '../../pages/Community/TeamPhoto';
import TeamPhotoEmpire from '../../pages/Community/TeamPhotoEmpire';
import Whit from '../../images/whit.jpg';
import Ches from '../../images/ches.jpg';


const components = {
  rebels: TeamPhoto,
  empire: TeamPhotoEmpire,
};

const styles = theme => ({
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
  partnerLink: {
    borderRadius: '50%',
    backgroundImage: `url(${Whit})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '50px',
    height: ' 60px',
    padding: theme.spacing(2),
    verticalAlign: 'middle',
  },
  partnerStats: {
    margin: 'auto',
    backgroundColor: '#dee3ff',
  },
  partnerContainer: {
    backgroundColor: '#dee3ff',
    padding: theme.spacing(1),
  },
  ownScoreContainer: {
    padding: theme.spacing(1),
    margin: 'auto',
    textAlign: 'center',
  },
  ownLink: {
    borderRadius: '50%',
    backgroundImage: `url(${Ches})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '50px',
    height: ' 60px',
    padding: theme.spacing(2),
    verticalAlign: 'middle',
  },
});


class TeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes,
      photo,
      teamName,
    } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const Photo = components[photo];
    return (
      <Paper className={classes.teamCard}>
        <Grid container spacing={3}>

          <Grid item xs={4}>
            <Paper className={fixedHeightPaper}>
              <Photo className={fixedHeightPaper} />
              <Typography className={classes.teamPointsTitle} variant="h5" gutterBottom>
                {teamName}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Grid container className={classes.partnerContainer}>

              <Grid item xs={2} className={classes.partnerStats}>
                <Button className={classes.partnerLink} />
              </Grid>

              <Grid item xs={5} className={classes.partnerStats}>
                <Typography className={classes.teamPointsTitle} variant="h5">
                  Progress
                </Typography>
                <Typography className={classes.teamPointsRed} variant="h4">
                  98%
                </Typography>
              </Grid>

              <Grid item xs={5} className={classes.partnerStats}>
                <Typography className={classes.teamPointsTitle} variant="h5">
                  Total Points
                </Typography>
                <Typography className={classes.teamPointsRed} variant="h4">
                  528
                </Typography>
              </Grid>


            </Grid>

            <Grid item xs={12} className={classes.ownScoreContainer}>
              <Typography className={classes.teamPointsTitle} variant="h5">
                Your Points
              </Typography>
              <Typography className={classes.teamPointsRed} variant="h3">
                10/15
              </Typography>
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
  teamName: PropTypes.string.isRequired,
};

export default withStyles(styles)(TeamCard);
