import { useSelector } from "react-redux";

function FooterProject () {

    const darkmode = useSelector((state) => state.darkMode)
    const cssClass = darkmode ? 'Footer-Project Footer-Project-dark' : 'Footer-Project';

    return (
        <div className={cssClass}>
            <h1>Le projet</h1>
                <p>Créée pour les voyageurs nomades, Day & Night est une application web proposant une carte de France interactive sur laquelle sont répertoriés les spots dans la nature où dormir ainsi que les endroits à visiter. Ces derniers peuvent être des points de vue, des départs de randonnée, des éléments du patrimoine, etc.</p>
        </div>
    );
}

export default FooterProject;