import React, { useState } from 'react';
import UsernameInput from '../../components/UsernameInput';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import './SignupForm.css';
import './Form.css'

function SignupForm({ onTogglePage }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');

    //Hàm kiểm tra email hợp lệ hay không
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //Xử lí sự kiện khi nhấn nút Signup
    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError(false);

        const isEmailValid = validateEmail(email);
        if (!isEmailValid) setEmailError(true);

        if (isEmailValid) {
            console.log('Username: ', username);
            console.log('Email: ', email);
            console.log('Password: ', password);
        }
    };

    return (
        <div className='login-signup-container'>
            <div className='login-signup-form'>
                <h2 className='login-signup-title'>Sign Up</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <UsernameInput
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                        <button className='login-signup-button'>
                            Sign Up
                        </button>
                    </div>

                    {/* Gọi hàm onTogglePage để chuyển trang */}
                    <div className="form-footer-signup">
                        <a href='#' onClick={(e) => {
                            e.preventDefault();
                            onTogglePage();
                        }}>
                            Already have an account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;