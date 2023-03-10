import './DeleteSpot.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function DeleteSpot({ setDeleteIsOpen, setIsOpen }) {

    const currentSpot = useSelector((state) => state.currentSpot);

    const handleClick = () => {
        axios.delete(`http://localhost:8080/api/spot/${currentSpot.id}/delete`, {withCredentials: true})
            .then(() => {
                setIsOpen(false);
                setDeleteIsOpen(false);
            })
    }

    return (
        <div className="DeleteSpot">
            <h1>Voulez-vous supprimer votre spot ?</h1>

            <button
                className="DeleteSpot-button"
                onClick={handleClick}
            >OUI</button>

            <button
                className="DeleteSpot-button"
                onClick={() => setDeleteIsOpen(false)}
            >NON</button>
        </div>
    );
}

DeleteSpot.propTypes = {
    setDeleteIsOpen: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default DeleteSpot;