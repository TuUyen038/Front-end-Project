import React from 'react';
import TextField from '@mui/material/TextField';
import './input.css';

function UsernameInput({ value, onChange }) {
    return (
        <div className='input-container'>
            <label htmlFor='username'>Username</label>
            <TextField
                type='text'
                id='username'
                placeholder='Enter your username'
                value={value}
                onChange={onChange}
                fullWidth
                required
            />
        </div>
    );
}

export default UsernameInput;