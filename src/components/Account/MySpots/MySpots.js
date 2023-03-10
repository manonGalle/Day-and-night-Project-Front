import './MySpots.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../../../assets/delete.png';
import axios from 'axios';

function MySpots() {

    const [mySpots, setMySpots] = useState([]);
    const [mySpot, setMySpot] = useState([]);
    const [mySpotID, setMySpotID] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState(mySpot.title);
    const [description, setDescription] = useState(mySpot.description);
    const [picture, setPicture] = useState(mySpot.picture);
    const [category, setCategory] = useState(0);
    const [uploadPicture, setUploadPicture] = useState(false);

    const navigate = useNavigate();

    const userID = useSelector((state) => state.userID);
    const categories = useSelector((state) => state.categories);
    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;
    const darkmode = useSelector((state) => state.darkMode);
    const cssClass = darkmode ? 'Myspots Myspots-dark' : 'Myspots';

    useEffect(() => {
        axios.get(`${apiBackUrl}/api/user/${userID}/spots`, { withCredentials: true })
            .then((response) => {
                setMySpots(response.data.spotsFromUser)
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    const handleClick = (mySpot) => {
        setMySpot(mySpot);
        setIsOpen(!isOpen);
        setMySpotID(mySpot.id);
        setTitle(mySpot.title);
        setDescription(mySpot.description);
        setPicture(mySpot.picture);
        setCategory(mySpot.category);
        setStatus(mySpot.validation);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('picture', picture);
        formData.append('category', category);

        axios({
            url: `${apiBackUrl}/api/spot/${mySpot.id}/edit`,
            method: 'post',
            withCredentials: true,
            data: formData,
        })
            .then((response) => {
                setStatus("Waiting");
                toast.success("Merci ! Vos modifications seront visibles une fois validées par un administrateur.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            })
            .catch((error) => {
                console.log(error);
                toast.error('Erreur lors de la mise à jour de vos données, merci de réessayer.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/1234");
            })
    };

    const handleButton = () => {
        setEditIsOpen(true);
    }

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
        setUploadPicture(true);
    };

    const handlePicture = () => {
        setUploadPicture(true)
        setPicture('');
    };

    return (
        <>
            <div className={cssClass}>
                <div className="Myspots-general">
                    <fieldset className="Myspots-fieldset">
                        <legend className="Myspots-title">La liste de mes spots</legend>
                        {mySpots.length === 0 ?
                        <h1 className="MySpots-empty">Vous n'avez pas encore créé de spot.</h1>
                        :
                        <div className="Myspots-infos" >
                            {mySpots.map((mySpot) =>
                                <div className="Myspots-container" key={mySpot.id}>
                                    <div className="Myspots-container-title">
                                        <div
                                            className="Myspots-spot-title"
                                            onClick={() => handleClick(mySpot)}
                                        >
                                            {mySpot.title}
                                        </div>
                                    </div>
                            
                                    {mySpotID === mySpot.id && isOpen === true &&
                                        <div className='Myspots-container-infos'>
                                            <div className="Myspots-status">Statut :
                                                {status === "Waiting" ? " En attente de validation" :
                                                    status === "Validated" ? " Validé" :
                                                        " Non validé"}</div>
                                            {status === "Validated" && editIsOpen === false &&
                                                <div className="Myspots-button">
                                                    <button
                                                        className="Myspots-edit"
                                                        onClick={handleButton}
                                                    >
                                                        Modifier
                                                    </button>
                                                </div>
                                            }

                                            {status === "Validated" && editIsOpen &&
                                                <div className="Myspots-editspot-general">
                                                    <div className='Myspots-editspot-cross-close' onClick={() => setEditIsOpen(false)}>X</div>
                                                    <div className="Myspots-editspot-container">
                                                        <div className='Myspots-editspot-titleForm'>Modification</div>
                                                        <div className="Myspots-editspot-infos">
                                                            <form className="Myspots-editspot-Form" onSubmit={handleSubmit}>

                                                                {!uploadPicture && picture !== null ?
                                                                    <div className='Myspots-editspot-picture'>
                                                                        <img className="picture-spot" src={`${apiBackUrl}/spots/${picture}`} alt="spot" />
                                                                        <div className='round'><img className="icon-delete" src={deleteIcon} alt="icon-delete" onClick={handlePicture} /></div>
                                                                    </div>
                                                                    :
                                                                    <input
                                                                        required
                                                                        type="file"
                                                                        name="picture"
                                                                        accept="image/png, image/jpeg, image/jpg"
                                                                        onChange={handlePictureChange}

                                                                    />
                                                                }

                                                                <select
                                                                    onChange={(e) => {
                                                                        const newCategory = e.target.value
                                                                        setCategory(newCategory);
                                                                    }}
                                                                >
                                                                    <option value="">Catégorie du spot ?</option>
                                                                    {categories.map((category) =>
                                                                        <option key={category.id} value={category.id} name={category.name}>{category.name}</option>
                                                                    )}
                                                                </select>

                                                                <textarea
                                                                    required
                                                                    name="title"
                                                                    className="Myspots-editspot-title"
                                                                    value={title}
                                                                    onChange={(e) => { setTitle(e.target.value) }}
                                                                />

                                                                <textarea
                                                                    required
                                                                    name='description'
                                                                    className='Myspots-editspot-description'
                                                                    value={description}
                                                                    onChange={(e) => { setDescription(e.target.value) }}
                                                                />

                                                                <div className="Myspots-editspot-button">
                                                                    <button type='submit'>Modifier</button>
                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                            }

                                        </div>

                                    }
                                </div>
                            )}
                        </div>
                        }
                    </fieldset>
                </div>
            </div>
        </>
    )
}

export default MySpots;