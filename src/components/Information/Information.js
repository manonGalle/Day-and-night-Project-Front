import './Information.scss';
import deleteIcon from '../../assets/delete.png';
import deleteIconDark from '../../assets/icon-poubelle-darkmod.png';
import editIcon from '../../assets/edit.png';
import editIconDark from '../../assets/icon-edition-darkmod.png';
import tent from '../../assets/tent.png';
import tentDark from '../../assets/tent-darkmod.png';
import sun from '../../assets/sun.png';
import sunDark from '../../assets/sun-darkmod.png';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';

import thumb_up from '../../assets/thumb_up.png';
import thumb_down from '../../assets/thumb_down.png';
import { actionAddDislike, actionAddLike } from '../../actions/actions';
import axios from 'axios';
import DeleteSpot from '../DeleteSpot/DeleteSpot';

import default_image from '../../assets/default_image.jpg';

function Information({ currentSpot, setEditIsOpen, currentUser, deleteIsOpen, setDeleteIsOpen, setIsOpen }) {

    const dispatch = useDispatch();

    const logged = useSelector((state) => state.logged);
    const darkmode = useSelector((state) => state.darkMode);

    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;

    const likes = useSelector((state) => state.currentSpot.likes);
    const dislikes = useSelector((state) => state.currentSpot.dislikes);

    const [activeBtn, setActiveBtn] = useState("none");

    const handleLikeClick = () => {
        if (activeBtn === "none"){
            const newLikesCount = currentSpot.likes +1;
            dispatch(actionAddLike(newLikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: newLikesCount,
                dislike: currentSpot.dislikes,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.error(error);
            })
            setActiveBtn("like");
        }if (activeBtn === "like") {
            const newLikesCount = currentSpot.likes -1;
            dispatch(actionAddLike(newLikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: newLikesCount,
                dislike: currentSpot.dislikes,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.error(error);
            })
            setActiveBtn("none");
        } if (activeBtn === "dislike") {
            const newLikesCount = currentSpot.likes +1;
            dispatch(actionAddLike(newLikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: newLikesCount,
                dislike: currentSpot.dislikes,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.error(error);
            })
            const newDislikesCount = currentSpot.dislikes -1;
            dispatch(actionAddDislike(newDislikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: currentSpot.likes,
                dislike: newDislikesCount,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.error(error);
            })
            setActiveBtn("like");
        }
    }

    const handleDisikeClick = () => {
        if (activeBtn === "none") {
            const newDislikesCount = currentSpot.dislikes +1;
            dispatch(actionAddDislike(newDislikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: currentSpot.likes,
                dislike: newDislikesCount,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.log(error);
            })
            setActiveBtn("dislike");

        } if (activeBtn === 'dislike') {
            const newDislikesCount = currentSpot.dislikes -1;
            dispatch(actionAddDislike(newDislikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: currentSpot.likes,
                dislike: newDislikesCount,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.log(error);
            })
            setActiveBtn("none");
        } if (activeBtn === "like") {
            const newDislikesCount = currentSpot.dislikes +1;
            dispatch(actionAddDislike(newDislikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: currentSpot.likes,
                dislike: newDislikesCount,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.log(error);
            })
            const newLikesCount = currentSpot.likes -1;
            dispatch(actionAddLike(newLikesCount));
            axios.post(`${apiBackUrl}/api/spot/${currentSpot.id}/review`, {
                like: newLikesCount,
                dislike: currentSpot.dislikes,
            },{withCredentials: true})
            .then((response) => {
                console.log(response);
            })
            .catch ((error) => {
                console.log(error);
            })
            setActiveBtn("dislike");
        }

    }


    return (
        <>
            <div className="Informations-picture">
                {currentSpot.picture === null &&
                    <img
                        className="picture-spot"
                        src={default_image}
                        alt="spot"
                    />
                }
                {currentSpot.picture &&
                    <img
                        className="picture-spot"
                        src={`${apiBackUrl}/spots/${currentSpot.picture}`}
                        alt="spot"
                    />
                }
            </div>

            <div className={currentSpot.category.name === "Day" ? "Informations-description Informations-description-border-day" : "Informations-description Informations-description-border-night"}>
                <div className="Title-and-icon">
                    <div className="icon">
                    {darkmode ?
                        <img 
                            className={currentSpot.category.name === "Day" ? 'sun' : 'tent'} 
                            src={currentSpot.category.name === "Day" ? sunDark : tentDark}
                            alt="category"
                        /> :
                        <img 
                            className={currentSpot.category.name === "Day" ? 'sun' : 'tent'} 
                            src={currentSpot.category.name === "Day" ? sun : tent}
                            alt="category"
                        />
                    }
                    </div>
                    <p className="Title">{currentSpot.title}</p>
                </div>

                <p className="Text">{currentSpot.description}</p>

                {logged &&
                    <div className="Information-rater">
                        <button
                            className= {`btn ${activeBtn === "like" ? "like-active" : ""}`}
                            onClick={handleLikeClick}
                        >
                            <img className="Information-rateSymbol" src={thumb_up} alt="like-icon" />
                            {likes}
                        </button>

                        <button
                            className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                            onClick={handleDisikeClick}
                        >
                            <img className="Information-rateSymbol" src={thumb_down} alt="dislike-icon"/>
                            {dislikes}
                        </button>
                    </div>
                }
                {!logged &&
                    <div className="Information-rater">
                        <div className='btn'>
                            <img className="Information-rateSymbol" src={thumb_up} alt="like-icon"/>
                            {likes}
                        </div>
                        <div className='btn'>
                            <img className="Information-rateSymbol" src={thumb_down} alt="dislike-icon"/>
                            {dislikes}
                        </div>
                    </div>
                }

            </div>


            {currentSpot.user.username === currentUser && !deleteIsOpen ?
                <div className="Informations-edit-delete">
                    <div className="edit">
                    {darkmode ?
                        <img 
                            className="icon-edit" 
                            src={editIconDark} 
                            alt="icon-edit" 
                            onClick={() => setEditIsOpen(true)} 
                        /> :
                        <img 
                            className="icon-edit" 
                            src={editIcon} 
                            alt="icon-edit" 
                            onClick={() => setEditIsOpen(true)} 
                        />
                    }
                    </div>
                    <div className="delete">
                    {darkmode ?
                        <img 
                            className="icon-delete" 
                            src={deleteIconDark} 
                            alt="icon-delete" 
                            onClick={() => setDeleteIsOpen(true)}
                        /> :
                        <img 
                            className="icon-delete" 
                            src={deleteIcon} 
                            alt="icon-delete" 
                            onClick={() => setDeleteIsOpen(true)}
                        />
                    }
                    </div>
                </div>
                : ''
            }

            {deleteIsOpen && <DeleteSpot setDeleteIsOpen={setDeleteIsOpen} setIsOpen={setIsOpen} />}


        </>
    );
}

Information.propTypes = {
    currentSpot: PropTypes.object.isRequired,
    setEditIsOpen: PropTypes.func.isRequired,
    currentUser: PropTypes.string.isRequired,
    deleteIsOpen: PropTypes.bool.isRequired,
    setDeleteIsOpen: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default Information;