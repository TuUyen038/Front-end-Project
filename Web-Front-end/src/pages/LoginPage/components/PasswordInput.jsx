import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import './input.css';

function PasswordInput({ value, onChange }) {
    const [showPassword, setShowPassword] = React.useState(false);

    // Hàm chuyển đổi giữa chế độ ẩn/hiện mật khẩu
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='input-container'>
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-password">Password</InputLabel>            
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={value}
                    onChange={onChange}
                    required
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={handleTogglePasswordVisibility}
                                edge='end'
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </div>
    );
}

export default PasswordInput;