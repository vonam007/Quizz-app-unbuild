import './Home.scss';
import videoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {


    const role = useSelector(state => state.user.account.role);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    return (
        <div className='Home'>
            <div className='welcome'>
                <h1>Welcome to my website</h1>
                <h3>Feel free to explore</h3>
                <p>This is a demo application for testing project</p>
                {isAuthenticated === false
                    ? <button className='getStart-Btn' onClick={() => navigate('/login')}>Get Start</button>
                    :
                    <>
                        {
                            role === 'USER'
                                ? <button className='getStart-Btn' onClick={() => navigate('/users')}>Do Quiz</button>
                                : <button className='getStart-Btn' onClick={() => navigate('/admins')}>Dashboard</button>
                        }
                    </>
                }
            </div>
            <div className='video-container'>
                <video autoPlay loop playsInline muted className='video'>
                    <source
                        src={videoHomePage}
                        type='video/mp4'
                    />
                </video>
            </div>
        </div>
    );
}
export default Home;