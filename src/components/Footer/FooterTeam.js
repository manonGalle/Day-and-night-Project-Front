import dipsy from '../../assets/Dipsy.png';
import po from '../../assets/po.png';
import lala from '../../assets/Lala.png';
import sunny from '../../assets/sunny-baby.png';
import { useSelector } from 'react-redux';

function FooterTeam() {

    const darkmode = useSelector((state) => state.darkMode)
    const cssClass = darkmode ? 'Footer-Team Footer-Team-dark' : 'Footer-Team';

    return (
        <div className={cssClass}>
            <h1>L'équipe</h1>
                <div className="Footer-Team-member">
                    <img src={dipsy} alt="dipsy"/>
                    <div className="Footer-Team-member-right">
                        <h2>Albane MAGNIN</h2>
                        <p>Product Owner - développeuse front</p>
                    </div>
                </div>

                <div className="Footer-Team-member">
                    <img src={po} alt="po"/>
                    <div className="Footer-Team-member-right">
                        <h2>Manon GALLE</h2>
                        <p>Scrum master - Développeuse front - Git master</p>
                    </div>
                </div>

                <div className="Footer-Team-member">
                    <img src={lala} alt="lala"/>
                    <div className="Footer-Team-member-right">
                        <h2>Anaïs JOUANNY</h2>
                        <p>Lead dev front - Développeuse front - Référente technique</p>
                    </div>
                </div>

                <div className="Footer-Team-member">
                    <img src={sunny} alt="sunny-baby"/>
                    <div className="Footer-Team-member-right">
                        <h2>Nicolas RAYNAUD</h2>
                        <p>Lead dev back - Développeur back</p>
                    </div>
                </div>
        </div>
    )
}

export default FooterTeam;