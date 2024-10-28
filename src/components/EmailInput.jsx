import React from 'react';
import TextField from '@mui/material/TextField';
import './input.css';

function EmailInput({ value, onChange, error }) {
    return (
        <div className='input-container'>
            <label htmlFor='email'>Email</label>
            <TextField
                type='email'
                id='email'
                placeholder='Enter your email'
                value={value}
                onChange={onChange}
                error={error}
                helperText={error ? 'Please enter a valid email.' : ''}
                fullWidth
                required
            />
        </div>
    );
}

export default EmailInput;