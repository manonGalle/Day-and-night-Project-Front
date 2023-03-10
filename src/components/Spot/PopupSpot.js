import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AddSpot from './AddSpot';
import PropTypes from 'prop-types';

import './PopupSpot.scss';

function PopupSpot({ setpopupIsOpen }) {

    const [addSpotIsOpen, setaddSpotIsOpen] = useState(false);
    const darkmode = useSelector((state) => state.darkMode);

    const divRef = useRef(null);

    const cssClass = darkmode ? 'PopupSpot PopupSpot-dark' : 'PopupSpot';

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        if(screen.width < 768) {
            divRef.current.scrollIntoView();
        }
    }, []);

    const toggleAddSpot = () => {
        if (addSpotIsOpen) {
            setaddSpotIsOpen(false);
        } else {
            setaddSpotIsOpen(true);
        }
    }

    const handleClickYes = (event) => {
        event.preventDefault();
        toggleAddSpot();
    }

    const handleClickNo = (event) => {
        event.preventDefault();
        setpopupIsOpen(false);
    }

    return (
        <fieldset className={cssClass} ref={divRef}>
            {!addSpotIsOpen &&
            <div className="PopupSpot-form">
                <h1>Voulez-vous ajouter un spot ?</h1>
                <div className="PopupSpot-div">
                    <button
                        className="PopupSpot-div-button"
                        onClick={handleClickYes}
                    >Oui</button>
                    <button
                        className="PopupSpot-div-button"
                        onClick={handleClickNo}
                    >Non</button>
                </div>
            </div>
            }
            {addSpotIsOpen && (<AddSpot setaddSpotIsOpen={setaddSpotIsOpen} setpopupIsOpen={setpopupIsOpen} />)}

        </fieldset>
    )
}

PopupSpot.propTypes = {
    setpopupIsOpen: PropTypes.func.isRequired,
}

export default PopupSpot;