import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = (props) => {

    const role = useSelector(state => state.user.account.role);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    if (role === 'USER' && props.children.type.name === 'Admin') {
        return <Navigate to='/' />
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default PrivateRoutes;