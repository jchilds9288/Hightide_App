import React  from 'react';
import TextField from '@material-ui/core/TextField';

export const FormTextField = props => {
    return (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              {...props}
            />
    );
};
