import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { useAuthStore } from '../hooks';

export const PublicRouter = ({ children }) => {
    const { status } = useAuthStore();

    return (status === 'authenticated')
        ? <Navigate to="/" />
        : children
}

PublicRouter.propTypes = {
    children: PropTypes.element,
}