import './Connect.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { actionConnect } from '../../actions/actions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function Connect({ email, setEmail }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    /* LOCAL STATE */
        // Login user
    const [password, setPassword] = useState('');
        // Create new user
    const [username, setUsername] = useState('');
    const [emailCreate, setEmailCreate] = useState('');
    const [emailConfirmed, setEmailConfirmed] = useState('');
    const [passwordCreate, setPasswordCreate] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;
    const darkmode = useSelector((state) => state.darkMode);

    const cssClass = darkmode ? 'Connect-general Connect-general-dark' : 'Connect-general';
    
    /* CREATE NEW USER */
    const handleCreate = (event) => {
        event.preventDefault();
        //Check : 
        // emailCreate is the same than emailConfirmed
        // passwordCreate is the same than passwordConfirmed
        if (emailCreate === emailConfirmed && passwordCreate === passwordConfirmed) {
            axios.post(`${apiBackUrl}/api/user/create`, {
                username: username,
                email: emailCreate,
                password: passwordCreate,
            }, {withCredentials: true})
                .then((response) => {
                    console.log(response)
                    toast.success("Félicitations ! Votre compte vient d'être créé !", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigate("/");
                })
                .catch((error) => {
                    toast.error('Erreur lors de la création de votre compte, merci de réessayer.', {
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

    /* LOGIN USER */ 
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiBackUrl}/api/user/login`, {
            username: email,
            password: password,
        }, {withCredentials: true})
        
        .then((response) => {
            const username = response.data.user.username;
            const token = response.data.token;
            const userID = response.data.user.user_id;
            const role = response.data.user.role[0];
            
            dispatch(actionConnect(username, token, userID, role));

            navigate("/");
        })
        .catch((error) => {
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
            console.error(error);
        })

    }
    return (
        <div className={cssClass}>
            <fieldset className="Connect-and-create-general">
            <legend className="Connect-and-create-general-title">Se connecter / Créer un compte</legend>
                <div className="Connect-and-create">
                    <div className="Connect">
                        <h2 className="Connect-login">Se connecter</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="Connect-form"
                        >
                            <input
                                type="email"
                                name="username"
                                placeholder="Mail :"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de passe : "
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                
                            />
                            <div className="Connect-button">
                                <button>Me connecter</button>
                            </div>
                        </form>
                    </div>
                        <div className="Create">
                            <h2 className="Create-login">Créer un compte</h2>
                            <form
                                className="Create-form"
                                onSubmit={handleCreate}
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
                                <div className="Create-button">
                                    <button>Créer mon compte</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </fieldset>
        </div>
    )
}


Connect.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
}

export default Connect;

