import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddSpot.scss';
import feu from '../../assets/feucamp.gif';
import PropTypes from 'prop-types';

function AddSpot({ setaddSpotIsOpen, setpopupIsOpen }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [category, setCategory] = useState([]);
    const [validateIsOpen, setValidateIsOpen] = useState(false);

    const lng = useSelector((state) => state.coord_x);
    const lat = useSelector((state) => state.coord_y);
    const userID = useSelector((state) => state.userID);
    const categories = useSelector((state) => state.categories);

    const darkmode = useSelector((state) => state.darkMode);

    const navigate = useNavigate();

    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;

    const cssClass = darkmode ? 'AddSpot-wrapper AddSpot-wrapper-dark' : 'AddSpot-wrapper';

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('picture', picture);
        formData.append('user', userID);
        formData.append('coord_x', lng);
        formData.append('coord_y', lat);
        formData.append('category', category);

        axios({
            url: `${apiBackUrl}/api/spot/create`,
            method: 'post',
            withCredentials: true,
            data: formData,
        })
            .then((response) => {
                console.log(response)
                setValidateIsOpen(true);
            })
            .catch((error) => {
                toast.error('Une erreur est survenue lors du chargement des vos informations. Merci de contacter un administrateur.', {
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
    }
    const handleClickValidateMessage = (e) => {
        setValidateIsOpen(false);
        setaddSpotIsOpen(false);
        setpopupIsOpen(false);
    };
    return (
        <div className={cssClass}>
            {!validateIsOpen &&
                <div className="AddSpot-general">
                    <div className="AddSpot-close" onClick={() => setaddSpotIsOpen(false)}>X</div>
                    <fieldset className="AddSpot">
                        <legend className="AddSpot-TitleForm">Créer un nouveau spot</legend>
                        <div className="AddSpot-infos">
                            <form
                                onSubmit={handleSubmit}
                                className="AddSpot-Form"
                            >
                                <select
                                    onChange={(e) => {
                                        const categoryId = e.target.value
                                        setCategory(categoryId);
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
                                    className="AddSpot-title"
                                    placeholder="Titre de votre spot"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />

                                <textarea
                                    required
                                    name='description'
                                    className="AddSpot-description"
                                    placeholder="Description de votre spot"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                />

                                <input
                                    type="file"
                                    name="picture"
                                    className="AddSpot-file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        setPicture(e.target.files[0]);
                                    }}
                                />
                                <div className="AddSpot-button">
                                    <button>Créer le spot</button>
                                </div>
                            </form>
                        </div>
                    </fieldset>
                </div>
            }
            {validateIsOpen &&
                <fieldset className="AddSpot-validate-fieldset">
                    <div className="AddSpot-validateMessage">
                        <img src={feu} alt="gif-feu-de-camp"></img>
                        <h1>Merci pour cet ajout ! <br />Votre spot sera visible sur la carte une fois validé par un administrateur.</h1>
                        <button
                            onClick={handleClickValidateMessage}
                        >OK</button>
                    </div>
                </fieldset>
            }
        </div>
    )
};

AddSpot.propTypes = {
    setaddSpotIsOpen: PropTypes.func,
    setpopupIsOpen: PropTypes.func,
}

export default AddSpot;