import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import './input.css';

function EmailInput({ value, onChange, error }) {
    return (
        <div className='input-container'>
            <FormControl variant="outlined" fullWidth error={error}>
                <InputLabel htmlFor="outlined-email">Email</InputLabel>            
                <OutlinedInput
                    type='email'
                    id='email'
                    value={value}
                    onChange={onChange}
                    required
                    label='Email'
                />
                {error && (
                    <FormHelperText>Please enter a valid email.</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}

export default EmailInput;