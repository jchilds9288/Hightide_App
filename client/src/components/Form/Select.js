/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '16px',
    marginBottom: '8px',
  },
  formControl: {
    flex: 1,
  },
}));

export default function SimpleSelect({
  handleChange,
  title,
  options,
  value,
}) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleLocalChange(event) {
    handleChange(event.target.value);
  }

  function renderPoints() {
    const arr = [];
    options.forEach((option) => {
      arr.push(<MenuItem key={option} value={option}>{option}</MenuItem>);
    });
    return arr;
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          {title}
        </InputLabel>
        <Select
          value={value}
          onChange={handleLocalChange}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            renderPoints()
          }
        </Select>
      </FormControl>

    </form>
  );
}

SimpleSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
};
