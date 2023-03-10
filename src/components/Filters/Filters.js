import './Filters.scss';
import tent from '../../assets/tent.png';
import sun from '../../assets/day-icon.png';
import sundark from '../../assets/sun-darkmod.png';
import tentdark from '../../assets/tent-darkmod.png'
import { useDispatch, useSelector } from 'react-redux';
import { actionReverseCheckDay, actionReverseCheckNight } from '../../actions/actions';

function Filters() {
    const checkNight = useSelector((state) => state.checkNight);
    const checkDay = useSelector((state) => state.checkDay);
    const darkmode = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();

    const cssClass = darkmode ? 'Filters Filters-dark' : 'Filters';

    const setNightValue = () => {
        dispatch(actionReverseCheckNight());
    };

    const setDayValue = () => {
        dispatch(actionReverseCheckDay());
    };

    return (
        <div className={cssClass}>

            <div className="Filter Filter-night">
                {!darkmode &&
                    <img 
                        src={tent} 
                        alt="tent-icon" />
                }
                {darkmode &&
                    <img 
                        src={tentdark} 
                        alt="tent-icon" />
                }
                <label className="Switch">
                    <input type="checkbox" checked={checkNight} onChange={setNightValue} />
                    <span className="Slider"></span>
                </label>
            </div>

            <div className="Filter Filter-day">
            {!darkmode &&
                <img 
                    src={sun} 
                    alt="sun-icon" />
            }
            {darkmode &&
                <img 
                    src={sundark} 
                    alt="sun-icon" />
            }
                <label className="Switch">
                    <input type="checkbox" checked={checkDay} onChange={setDayValue} />
                    <span className="Slider"></span>
                </label>
            </div>

        </div>
    );
}

export default Filters;