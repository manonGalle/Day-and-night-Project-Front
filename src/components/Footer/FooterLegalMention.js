import { useSelector } from "react-redux";

function FooterLegalMention() {

    const darkmode = useSelector((state) => state.darkMode)
    const cssClass = darkmode ? 'Footer-LegalMention Footer-LegalMention-dark' : 'Footer-LegalMention';

    return (
        <div className={cssClass}>
            <h1>Mentions légales</h1>
                <p>Le Site XXX.com est édité et exploité par : 
                XXX
                Adresse : XXX
                E-mail : XXX
                Responsables de Publication : XXX / XXX
                </p>

            <h1>Hébergement du site</h1>

            <h1>CGU</h1>
                
            <h1>Protection des données personnelles</h1>

        </div>
    );
}

export default FooterLegalMention;