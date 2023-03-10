import './Account.scss';
import MyData from './MyData/MyData';
import MySpots from './MySpots/MySpots';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Account({ connectedUsername, email }) {

    const darkmode = useSelector((state) => state.darkMode);
    const cssClass = darkmode ? 'Account Account-dark' : 'Account';

    return (
        <div className={cssClass}>
            <MySpots />
            <MyData connectedUsername={connectedUsername} email={email} />
        </div>

    )
}

Account.propTypes = {
    connectedUsername: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}

export default Account;