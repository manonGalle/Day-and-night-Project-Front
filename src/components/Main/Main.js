import { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Filters from '../Filters/Filters';
import Informations from '../Informations/Informations';
import Map from '../Map/Map';
import PopupSpot from '../Spot/PopupSpot';
import { actionSetSpots } from '../../actions/actions';
import './Main.scss';
import axios from 'axios';

function Main() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [popupIsOpen, setpopupIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);

    const currentSpot = useSelector((state) => state.currentSpot);
    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;

    // Spots List from DB -> filter to validated / night / day
    // call them after each rendering
    useEffect(() => {
        axios.get(`${apiBackUrl}/api/spot/list`, {withCredentials: true})
        .then((response) => {
            const spots = response.data.spotList;        
            const validatedSpots = spots.filter((spot) => spot.validation === "Validated");   
            
            dispatch(actionSetSpots(validatedSpots));
        })
        .catch((error) => {
            console.error(error);
        });
    });

    
    return (
        <div className="Wrap">

            <div className="Map">
                <Filters />
                <Map
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    popupIsOpen={popupIsOpen}
                    setpopupIsOpen={setpopupIsOpen}
                    editIsOpen={editIsOpen}
                    setEditIsOpen={setEditIsOpen}
                    deleteIsOpen={deleteIsOpen}
                    setDeleteIsOpen={setDeleteIsOpen}
                />
            </div>

            {isOpen && 
                (<Informations
                    currentSpot={currentSpot}
                    editIsOpen={editIsOpen}
                    setEditIsOpen={setEditIsOpen}
                    deleteIsOpen={deleteIsOpen}
                    setDeleteIsOpen={setDeleteIsOpen}
                    setIsOpen={setIsOpen}
                />)}

            {popupIsOpen &&
                (<PopupSpot popupIsOpen={popupIsOpen} setpopupIsOpen={setpopupIsOpen} />)}
            

        </div>
    );
}

export default Main;