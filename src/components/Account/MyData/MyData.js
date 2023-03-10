import './MyData.scss';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionDisconnect } from '../../../actions/actions';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function MyData({ connectedUsername, email }) {

    /* LOCAL STATE */
    // CHECK PASSWORD
    const [passwordSend, setPasswordSend] = useState('');
    const [matchPassword, setMatchPassword] = useState(null);

    // EDIT DATAS
    const [username, setUsername] = useState(connectedUsername);
    const [emailCreate, setEmailCreate] = useState('');
    const [emailConfirmed, setEmailConfirmed] = useState('');
    const [passwordCreate, setPasswordCreate] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userID = useSelector((state) => state.userID);
    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;

    /* CHECK PASSWORD */
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiBackUrl}/api/user/${userID}/verify`, {
            password: passwordSend,
        }, { withCredentials: true })
            .then((response) => {
                setMatchPassword(response.data.verify);
            })
            .catch((error) => {
                setMatchPassword(false);
                console.error(error);
            });
    }

    /* EDIT DATAS */

    const handleChange = (event) => {
        event.preventDefault();
        if (emailCreate === emailConfirmed && passwordCreate === passwordConfirmed) {
            axios.patch(`${apiBackUrl}/api/user/${userID}/edit`, {
                username: username,
                email: emailCreate,
                password: passwordCreate,
            }, { withCredentials: true })
                .then((response) => {
                    toast.success("Vos modifications ont bien été prises en compte. Vous pouvez vous reconnecter avec vos nouveaux identifiants.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    dispatch(actionDisconnect())
                    navigate("/login");
                })
                .catch((error) => {
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
                    console.error(error);
                    navigate("/1234");
                })
        } else {
            toast.error("L'email et/ou le password ne correspondent pas. Merci de réessayer", {
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
    };

    return (
        <>
        <div className="Account-mydata-general">
            <fieldset className="Account-mydata">
                <legend className="Account-mydata-title">Mes infos</legend>
                <div className="Account-mydata-infos">
                    <div className="Account-mydata-login">{connectedUsername}</div>
                    <div className="Account-mydata-email">{email}</div>
                </div>
            </fieldset>
        </div>
                
        {matchPassword === null || matchPassword === false ?
        <div className="Account-edit-mydata-general">
            <fieldset className="Account-edit-mydata">
                <legend className="Account-edit-mydata-title">Modifier mes infos</legend>

                <div className="Account-edit">
                    {matchPassword === false && (<p>Une erreur s'est produite, veuillez réessayer.</p>)}
                    <div className="Account-edit-message">Veuillez d'abord renseigner votre ancien mot de passe</div>
                    <form
                        onSubmit={handleSubmit}
                        className="Account-edit-password"
                    >
                        <input
                            required
                            className="Account-edit-input"
                            type="password"
                            name="password"
                            placeholder="Mot de passe : "
                            value={passwordSend}
                            onChange={(event) => {
                                setPasswordSend(event.target.value);
                            }}
                        />
                        <div className="Account-edit-button">
                            <button>Valider</button>
                        </div>
                    </form>
                </div>
            </fieldset>
        </div>
        : ''
    }

    {
        matchPassword &&

        <div className="Account-edit-mydata-general">
            <fieldset className="Account-edit-mydata">
                <legend className="Account-edit-mydata-title">Modifier mes infos</legend>
                <div className="Account-edit-newdatas">
                    <form
                        onSubmit={handleChange}
                        className="Account-edit-newdatas-form"
                    >
                        <input
                            required
                            type="text"
                            name="username"
                            placeholder="Pseudo :"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Mail : "
                            value={emailCreate}
                            onChange={(event) => {
                                setEmailCreate(event.target.value);
                            }}
                        />
                        <input
                            required
                            type="email"
                            name="emailConfirmed"
                            placeholder="Confirmation mail : "
                            value={emailConfirmed}
                            onChange={(event) => {
                                setEmailConfirmed(event.target.value);
                            }}
                        />
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="Mot de passe : "
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Votre mot de passe doit contenir 6 caractères ou plus, avec au moins un nombre, une majuscule et une minuscule."
                            value={passwordCreate}
                            onChange={(event) => {
                                setPasswordCreate(event.target.value);
                            }}
                        />
                        <input
                            required
                            type="password"
                            name="passwordConfirmed"
                            placeholder="Confirmation mot de passe : "
                            value={passwordConfirmed}
                            onChange={(event) => {
                                setPasswordConfirmed(event.target.value);
                            }}
                        />

                        <div className="Account-edit-button">
                            <button>Valider</button>
                        </div>
                    </form>
                </div>
            </fieldset>
        </div>
    }
    </>
    )
}

MyData.propTypes = {
    connectedUsername: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}


export default MyData;