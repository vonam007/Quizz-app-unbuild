import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService'
import { toast } from 'react-toastify';
import { BiShow, BiHide } from "react-icons/bi";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async () => {
        //validate
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (!validateEmail(email)) {
            toast.error('Email is not valid');
        }
        if (password.length < 6) {
            toast.warn('Password must be at least 8 characters');
        }
        if (!validateEmail(email) || password.length < 6) {
            return;
        }
        //submit API
        let res = await postRegister(email, username, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
        else if (res && res.EC !== 0) {
            toast.error(res.EM);
        }

    }


    return (
        <div className="login-container">
            <div className='Header'>
                Already have an account? <Link to="/login">Log in</Link> <span>Need help?</span>
            </div>
            <div className='Content'>
                <div className='Welcome'>
                    <h1>Welcome to NamVo</h1>
                    <p>Log in to your account</p>
                </div>
                <div className='Login-content'>
                    <div className='Login-input'>
                        <div className='inputInfo'>
                            <label htmlFor='Email'>Email<span style={{ color: "red" }}>*</span></label>
                            <input
                                type='text'
                                placeholder='Example@email.com'
                                id='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='inputInfo'>
                            <label htmlFor='Username'>Username</label>
                            <input
                                type='text'
                                placeholder='Example'
                                id='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='inputInfo password-group'>
                            <label htmlFor='Password'>Password<span style={{ color: "red" }}>*</span></label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='At least 8 characters'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className='show-password'>
                                {showPassword ? < BiHide onClick={() => setShowPassword(false)} /> : < BiShow onClick={() => setShowPassword(true)} />}</span>
                        </div>
                    </div>

                    <button onClick={() => handleSignUp()}>Create my new account</button>
                    <span className='back-home' onClick={() => navigate('/')}> &#60; &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register;