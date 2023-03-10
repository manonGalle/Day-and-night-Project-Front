import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer () {

    const darkmode = useSelector((state) => state.darkMode);

    const cssClass = darkmode ? 'Footer Footer-dark' : 'Footer';

    return (
        <footer className={cssClass}>
        <div className="Footer-About">
            <h4>A propos de Day&Night</h4>
            <nav>
                <Link to={"/team"}>L'équipe</Link>
                <Link to={"/project"}>Le projet</Link>
                <Link to={"/charter"}>Charte du voyageur responsable</Link>
            </nav>
        </div>
        <div className="Footer-Contact">
            <h4>Contacts</h4>
            <Link to={"/"}>Nous contacter</Link>
        </div>
        <div className="Footer-LegalNotices">
            <h4>Mentions légales</h4>
            <Link to={"/legal-mention"}>Mentions légales</Link>
        </div>
    </footer>
    )
};

export default Footer;