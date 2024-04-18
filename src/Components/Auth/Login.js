import { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify';
import { BiShow, BiHide } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";


import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        //validate
        if (!email) {
            toast.warn('Email is required');
        }
        if (password.length < 6) {
            toast.warn('Password must be at least 8 characters');
        }
        if (!email || password.length < 6) {
            return;
        }
        setIsLoading(true);
        //submit API
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            dispatch(doLogin(res.DT));
            toast.success(res.EM + ', Redirecting home...');
            setIsLoading(false);
            setTimeout(() => {
                if (res.DT.role === 'ADMIN') {
                    navigate('/admins');
                }
                else {
                    navigate('/');
                }
            }, 1000);
        }
        else if (res && res.EC !== 0) {
            toast.error(res.EM);
            setIsLoading(false);
        }

    }


    return (
        <div className="login-container">
            <div className='Header'>
                Don't have an account? <Link to="/register">Sign up</Link> <span>Need help?</span>
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
                    <div className='forgot-password'>Forgot password?</div>

                    <button
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >
                        {
                            isLoading
                                ? <>
                                    <span className='spinner-container'>
                                        <CgSpinner className='spinner' />
                                    </span>
                                    Logging in...
                                </>
                                : 'Log in'
                        }
                    </button>
                    <span className='back-home' onClick={() => navigate('/')}> &#60; &#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;