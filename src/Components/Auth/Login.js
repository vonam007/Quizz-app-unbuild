import { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        alert('Login successfully');
    }

    return (
        <div className="login-container">
            <div className='Header'>
                Don't have an account? <Link to="/">Sign up</Link> <span>Need help?</span>
            </div>
            <div className='Content'>
                <div className='Welcome'>
                    <h1>Welcome to NamVo</h1>
                    <p>Log in to your account</p>
                </div>
                <div className='Login-content'>
                    <div className='Login-input'>
                        <div className='inputInfo'>
                            <label htmlFor='Email'>Email</label>
                            <input
                                type='text'
                                placeholder='Example@email.com'
                                id='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='inputInfo'>
                            <label htmlFor='Password'>Password</label>
                            <input
                                type='password'
                                placeholder='At least 8 characters'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='forgot-password'>Forgot password?</div>

                    <button onClick={() => handleLogin()}>Log in</button>

                </div>
            </div>
        </div>
    )
}

export default Login;