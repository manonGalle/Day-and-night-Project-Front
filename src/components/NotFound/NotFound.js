import './NotFound.scss';
import { Link } from 'react-router-dom';
import interdit from '../../assets/no-camping.png';
import hiker from '../../assets/slide.png';
import { useSelector } from 'react-redux';

function NotFound() {
    const darkmode = useSelector((state) => state.darkMode);
    const cssClass = darkmode ? 'NotFound NotFound-dark' : 'NotFound';

    return (
        <div className={cssClass}>
            <div className="NotFound-404">
                <div className="NotFound-404-hiker">
                    <img className="NotFound-404-hiker-fall" src={hiker} alt="Randonneur qui tombe" />
                </div>
                <p className="NotFound-404-firstchar">4</p>
                <img className="NotFound-404-tent" src={interdit} alt="Interdiction de camper" />
                <p className="NotFound-404-lastchar">4</p>
            </div>
            
            <div className="NotFound-bottom">
                <p className="NotFound-bottom-message"><span>Oops</span>, ce chemin n'est pas accessible ...</p>
                <p className="NotFound-bottom-redirection">En revanche vous trouverez <Link to={'/'}> ici</Link>, toute une liste de spots pratiquables et incroyables !</p>
            </div>

        </div>
    );
}

export default NotFound;