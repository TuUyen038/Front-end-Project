import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './input.css';

function PasswordInput({ value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    // Hàm chuyển đổi giữa chế độ ẩn/hiện mật khẩu
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='input-container'>
            <label htmlFor='password'>Password</label>
            <TextField
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Enter your password'
                value={value}
                onChange={onChange}
                fullWidth
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    );
}

export default PasswordInput;