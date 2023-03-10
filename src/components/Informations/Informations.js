import './Informations.scss';
import { useEffect, useRef } from 'react';
import Information from '../Information/Information';
import EditSpot from '../EditSpot/EditSpot';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Informations({ currentSpot, editIsOpen, setEditIsOpen, deleteIsOpen, setDeleteIsOpen, setIsOpen }) {
    const divRef = useRef(null);
    const currentUser = useSelector((state) => state.connectedUsername);
    const darkmode = useSelector((state) => state.darkMode);

    const cssClass = darkmode ? 'Informations Informations-dark' : 'Informations';

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        if(screen.width < 768) {
            divRef.current.scrollIntoView();
        }
    }, []);

    return (
        <div className={cssClass} ref={divRef} >

            {editIsOpen && currentSpot.user.username === currentUser ? 
                <EditSpot currentSpot={currentSpot} setEditIsOpen={setEditIsOpen} setIsOpen={setIsOpen} /> 
                :
                <Information
                    currentSpot={currentSpot}
                    setEditIsOpen={setEditIsOpen}
                    currentUser={currentUser}
                    deleteIsOpen={deleteIsOpen}
                    setDeleteIsOpen={setDeleteIsOpen}
                    setIsOpen={setIsOpen}
                /> 
            }
            

        </div>
    );
}

Informations.propTypes = {
    currentSpot: PropTypes.object.isRequired,
    editIsOpen: PropTypes.bool.isRequired,
    setEditIsOpen: PropTypes.func.isRequired,
    deleteIsOpen: PropTypes.bool.isRequired,
    setDeleteIsOpen: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default Informations;