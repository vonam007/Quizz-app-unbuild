import './User.scss';
import ListQuiz from "./ListQuiz";
const User = (props) => {
    return (
        <div className='User-page'>
            <h1>Users</h1>
            <div>
                <h2>Users Left</h2>
            </div>
            <div>
                <ListQuiz />
            </div>
        </div>
    );
}

export default User;
