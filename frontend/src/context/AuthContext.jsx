
import PropTypes from "prop-types";


export default function AuthProvider({ children }) {
    return children;

}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}