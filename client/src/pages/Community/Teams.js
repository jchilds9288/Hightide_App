import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';

import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TeamCard from '../../components/Cards/TeamCard';
import CreateCommunity from './CreateCommunity';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  modal: {
    top: '8%',
    left: '8%',
    transform: 'translate(-8%, -8}%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
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
  badgesContainer: {
    height: 240,
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
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
  buttonContainer: {
    textAlign: 'center',
  },
  teamHeader: {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Russo One, sans-serif',
  },
});


class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      teams: [],
    };
  }

  async componentDidMount() {
    const { data: teams } = await axios.get('/api/team');
    console.log(JSON.stringify(teams))
    console.log(`already done...`)
    this.setState({ teams })
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  async handleSave(e) {
    console.log(`receive: ${JSON.stringify(e)}`)
    const { data: teams } = await axios.get('/api/team');
    this.setState({ open: false, teams });
  }

  render() {
    const { classes } = this.props;
    const { open, teams } = this.state;
    const score = {
      dailyPointsWon: 14,
      dailyPointsTotal: 25,
    };

    const closeModal = () => this.handleClose();
    const openModal = () => this.handleOpen();
    const handleSave = (e) => {
      console.log('am i here')
      console.log(JSON.stringify(e))
      this.handleSave();
    }

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className={classes.container}>
          <Typography className={classes.teamHeader} variant="h3" gutterBottom>
            Your Teams
          </Typography>
          <TeamCard score={score} photo="rebels" teamName="Rebel Brigade" />
          <TeamCard score={score} photo="empire" teamName="Empire Squad" />

          {
            teams.map((team)=> {
              return <TeamCard score={score} photo="empire" teamName={team.name} />
            })
          }

          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={openModal}
              className={classes.button}
            >
              <AddIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
                    Add Team
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
            >
              <CreateCommunity test="asdf" handleSave={handleSave} handleClose={closeModal} />
            </Modal>
          </Grid>
        </Container>
      </main>
    );
  }
}

Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);
