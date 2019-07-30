import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    flex: 1,
    textAlign: 'left',
    '& label': {
      margin: '0px',
      verticalAlign: 'middle',
    },
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <FormGroup className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <Grid container spacing={3}>
            <Grid item xs={4} sm={4}>
              <FormControlLabel
                control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
                label={props.labels[0]}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <FormControlLabel
                control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
                label={props.labels[1]}
              />
            </Grid>

            <Grid item xs={4} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
                }
                label={props.labels[2]}
              />
            </Grid>

        </Grid>
      </FormControl>
    </FormGroup>
  );
}
