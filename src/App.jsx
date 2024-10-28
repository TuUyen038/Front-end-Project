import React, { useState} from "react";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";

function AuthPage() {
    const [pageMode, setPageMode] = useState('login');

    const togglePageMode = () => {
        setPageMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    };

    return (
        <div className="auth-container">
            {pageMode === 'login' ? (
                <div className="login-page">
                    <LoginForm onTogglePage={togglePageMode}/>
                </div>
            ) : (
                <div className="signup-page">
                    <SignupForm onTogglePage={togglePageMode}/>
                </div>
            )
            }
        </div>
    );
}

export default AuthPage;