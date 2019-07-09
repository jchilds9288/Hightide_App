import React  from 'react';
import TextField from '@material-ui/core/TextField';

export const LoginTextField = props => {
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
