import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { setAnimation, spotsToDisplay } from '../../selectors/selector';
import { actionAddSpot, actionSetCurrentSpot } from '../../actions/actions';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './Map.scss';


function Map( { isOpen, setIsOpen, popupIsOpen, setpopupIsOpen, editIsOpen, setEditIsOpen, deleteIsOpen, setDeleteIsOpen } ) {
    const defaultCenter = {lat: 46.227638, lng: 2.213749};
    const [centerMap, setCenterMap] = useState(defaultCenter);
    const checkDay = useSelector((state) => state.checkDay);
    const checkNight = useSelector((state) => state.checkNight);
    const spotsList = useSelector((state) => spotsToDisplay(state.validatedSpots, checkDay, checkNight));
    const currentSpot = useSelector((state) => state.currentSpot);
    const isLogged = useSelector((state) => state.logged);
    const darkmode = useSelector((state) => state.darkMode);

    const [marker, setMarker] = useState([]);

    const dispatch = useDispatch();


    const apiKey = process.env.REACT_APP_GOOGLEMAP_APIKEY;


    // on spot click : set CurrentSpot for send its infos to other components
    const updateCurrentSpot = (clickedSpot) => {
        const spotSelected = spotsList.filter((spot) => spot.id === clickedSpot.id);
        dispatch(actionSetCurrentSpot(...spotSelected));
    };

    // on spot click : open div Infos except if the user has clicked on the same spot (close div)
    // and change center/zoom of the map
    // and close other div
    const toggleInfos = (clickedSpot) => {
        const newCenterMap = {lat: clickedSpot.coord_x, lng: clickedSpot.coord_y};

        if (isOpen && currentSpot.id === clickedSpot.id) {
            setIsOpen(false);
        } else if (editIsOpen) {
            setEditIsOpen(false);
        } else if (deleteIsOpen) {
            setDeleteIsOpen(false);
        } else {
            setIsOpen(true);
            setCenterMap(newCenterMap);
        }
    };


    const handleClick = (spot) => {
        updateCurrentSpot(spot);
        toggleInfos(spot);
    };

    const togglePopup = (lat, lng) => {
        if (popupIsOpen) {
            setpopupIsOpen(false);
        } else {
            setpopupIsOpen(true);
            dispatch(actionAddSpot(lat, lng));
        }
    }

    const handleClickMap = (e) => {
        if (isLogged) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            const positionNewMarker = {lat: lat, lng: lng};
            setIsOpen(false);
            setMarker(positionNewMarker);
            togglePopup(lat, lng, positionNewMarker);

        } else {
            toast.warn('Merci de vous connecter afin d\'ajouter un spot.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    return (

            <LoadScript googleMapsApiKey={apiKey}>
            
                <GoogleMap 
                    mapContainerClassName='Mapview'
                    center={centerMap}
                    zoom={5.3}
                    onClick={(e) => handleClickMap(e)}
                >
                    {spotsList.map((data) => {
                        const positionMarker = {lat: data.coord_x, lng: data.coord_y};
                        const colorMarker = data.category.name === 'Day' ? 'yellow' : 'purple';
                        const colorMarkerDark = data.category.name === 'Day' ? 'orange' : 'black';

                        return (
                            <Marker
                                key={data.id}
                                position={positionMarker}
                                icon={ darkmode ?
                                    `http://labs.google.com/ridefinder/images/mm_20_${colorMarkerDark}.png`
                                    : 
                                    `http://maps.google.com/mapfiles/ms/icons/${colorMarker}-dot.png`
                                    }
                                onClick={() => handleClick(data)}
                                animation={setAnimation(currentSpot, data.id, isOpen)}
                           />
                        )
                    }
                    )}
                    {popupIsOpen &&
                        <Marker 
                            position={marker}
                            icon={`http://maps.google.com/mapfiles/ms/icons/red.png`}
                        />
                    }
                </GoogleMap>
            </LoadScript>
    );
}

Map.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    popupIsOpen: PropTypes.bool.isRequired,
    setpopupIsOpen: PropTypes.func.isRequired,
    editIsOpen: PropTypes.bool.isRequired,
    setEditIsOpen: PropTypes.func.isRequired,
    deleteIsOpen: PropTypes.bool.isRequired,
    setDeleteIsOpen: PropTypes.func.isRequired,
}

export default Map;