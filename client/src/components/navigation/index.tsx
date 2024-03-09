import { Link, useLocation } from "react-router-dom";
import "./style.css"
import { logo, logowhite } from "../../assets/images";

const Navigation = () => {

    const location = useLocation();

    return (
        <nav className="navigation_body">
            <div className="navigation_wrapper">
                <div className="navigation_left"></div>
                <div className="navigation_center"></div>
                <div className="navigation_right">
                    <Link to="/"><div className="navigation_logo">
                        <img src={location.pathname === "/reading" ? logowhite: logo} alt="thoraread.online" />    
                    </div></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;