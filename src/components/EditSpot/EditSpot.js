import './EditSpot.scss';
import deleteIcon from '../../assets/delete.png';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import feu from '../../assets/feucamp.gif';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function EditSpot({ currentSpot, setEditIsOpen, setIsOpen }) {
    const navigate = useNavigate();
    const [uploadPicture, setUploadPicture] = useState(false);
    const [successForm, setSuccessForm] = useState(false);

    const [title, setTitle] = useState(currentSpot.title);
    const [description, setDescription] = useState(currentSpot.description);
    const [picture, setPicture] = useState(currentSpot.picture);
    const [category, setCategory] = useState(0);

    const categories = useSelector((state) => state.categories);
    const darkmode = useSelector((state) => state.darkMode);
    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;
    
    const cssClass = darkmode ? 'EditSpot EditSpot-dark' : 'EditSpot';

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('picture', picture);
        formData.append('category', category);

        axios({
            url: `${apiBackUrl}/api/spot/${currentSpot.id}/edit`,
            method: 'post',
            withCredentials: true,
            data: formData,
        })
            .then((response) => {
                setSuccessForm(true);
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
    };

    const handleClick = () => {
        setUploadPicture(true)
        setPicture('');
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
        setUploadPicture(true);
    };

    const handleClickValidateMessage = () => {
        setSuccessForm(false);
        setEditIsOpen(false);
        setIsOpen(false);
    };


    return (

        <div className={cssClass}>
            {!successForm ?
                <div className="EditSpot-general">
                    <div className='EditSpot-close' onClick={() => setEditIsOpen(false)}>X</div>

                    <fieldset className="EditSpot-fieldset">
                        <legend className='EditSpot-TitleForm'>Modifier mon spot</legend>

                        <div className="EditSpot-infos">
                            <form className="EditSpot-Form" onSubmit={handleSubmit}>

                                {!uploadPicture && picture !== null ?
                                    <div className='EditSpot-picture'>
                                        <img className="picture-spot" src={`${apiBackUrl}/spots/${picture}`} alt="spot" />
                                        <div className='round'><img className="icon-delete" src={deleteIcon} alt="icon-delete" onClick={handleClick} /></div>
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
                                    className="EditSpot-title"
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                />

                                <textarea
                                    required
                                    name='description'
                                    className='EditSpot-description'
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                />

                                <div className="EditSpot-button">
                                    <button type='submit'>Modifier</button>
                                </div>

                            </form>
                        </div>
                    </fieldset>
                </div>
                :
                <fieldset className="EditSpot-validate-fieldset">
                    <div className="EditSpot-validateMessage">
                        <img src={feu} alt="gif-feu-de-camp"></img>
                        <h1>Merci ! <br />Vos modifications seront visibles une fois validées par un administrateur.</h1>
                        <button
                            onClick={handleClickValidateMessage}
                        >OK</button>
                    </div>
                </fieldset>
            }

        </div>
    );
}

EditSpot.propTypes = {
    currentSpot: PropTypes.object.isRequired,
    setEditIsOpen: PropTypes.func.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}

export default EditSpot;