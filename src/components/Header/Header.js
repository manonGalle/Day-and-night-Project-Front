import { actionReverseMode } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import moon from '../../assets/moon.png';
import sun from '../../assets/sun.png';
import './Header.scss';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logged = useSelector((state) => state.logged);
    const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;
    const role = useSelector((state) => state.role);
    const darkmode = useSelector((state) => state.darkMode);

    const cssClass = darkmode ? 'Header Header-dark' : 'Header';

    const handleClick = () => navigate("/login");

    const handleClickMode = () => {
        document.body.classList.toggle('body-dark');
        dispatch(actionReverseMode());
    };

    return (
        <header className={cssClass}>
            <div className="Header-logo">
                <Link to={"/"}>
                    <img src={logo} alt="Logo Day&Night"
                    />
                </Link>
                <Link to={"/"}>
                    <h1>Day <span>& Night</span></h1>
                </Link>
            </div>
            <div className="Header-login">
                {logged === true ?
                    <>
                        <div className="Header-login-user">
                            <button className="Header-login-user-connectedusername">
                                <Link to={'/account'}>Mon Profil</Link>
                            </button>
                            <a 
                            className="Header-login-user-logout"
                            href="http://localhost:3000/">Déconnexion</a>
                        </div>

                        { role === 'ROLE_ADMIN' &&
                            <button className="buttonBackoffice">
                                <Link to={apiBackUrl + '/backoffice/spot/list'}>
                                    Backoffice
                                </Link>
                            </button>
                        }
                    </>
                    : 
                    <button
                        className="Header-Connect-button"
                        onClick={handleClick}
                    >
                        Se connecter
                    </button>
                }
                
                <button className='ToggleMode' onClick={handleClickMode}>
                    {darkmode ? <img src={sun} alt='sun-icon' /> : <img src={moon} alt='moon-icon' />}
                </button>
            </div>

        </header>

    )
};

export default Header;