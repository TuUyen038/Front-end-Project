import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import './input.css';

function UsernameInput({ value, onChange }) {
    return (
        <div className='input-container'>
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-username">Username</InputLabel>            
                <OutlinedInput
                    type='username'
                    id='username'
                    value={value}
                    onChange={onChange}
                    required
                    label='Username'
                />
            </FormControl>
        </div>
    );
}

export default UsernameInput;