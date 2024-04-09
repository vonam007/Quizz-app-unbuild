import './Home.scss';
import videoHomePage from '../../assets/video-homepage.mp4'

const Home = () => {
    return (
        <div className='Home'>
            <div className='welcome'>
                <h1>Welcome to my website</h1>
                <h3>Feel free to explore</h3>
                <p>This is a demo application for testing project</p>
                <button className='getStart-Btn'>Get Start</button>
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