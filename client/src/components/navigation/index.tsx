import { Link } from "react-router-dom";
import "./style.css"

const Navigation = () => {
    return (
        <nav className="navigation_body">
            <div className="navigation_wrapper">
                <div className="navigation_left"></div>
                <div className="navigation_right">
                    <Link to="/" className="navigation_logo">thoraread.online</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;