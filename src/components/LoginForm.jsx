import React, { useState } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import './LoginForm.css';

function LoginForm({ onTogglePage }) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //Xử lí sự kiện khi nhấn nút Login
    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError(false);

        const isEmailValid = validateEmail(email);
        if (!isEmailValid)
            setEmailError(true);

        if (isEmailValid) {
            console.log ('Email: ', email);
            console.log ('Password: ', password);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2 className='login-title'>Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <EmailInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className='button-container'>
                        <button className='login-button'>
                            Login
                        </button>
                    </div>

                    <div className="form-footer-login">
                        <a href='#' onClick={(e) => { 
                            e.preventDefault(); 
                            onTogglePage();
                        }}>
                            Create an account
                        </a>

                        <a href='#' onClick={(e) => {
                            e.preventDefault();
                            console.log('Forgot password clicked');
                        }}>
                            Forgot password
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;