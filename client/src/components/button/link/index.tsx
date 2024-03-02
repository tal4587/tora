import { Link, To } from "react-router-dom";
import "./style.css";

type ButtonPrimaryProps = {
    variant?: "filled" | "stroke",
    children: React.ReactNode,
    to: To,
}

const ButtonLink = ({ children, variant = "filled", to}: ButtonPrimaryProps) => {
    return (
        <Link className={`button_link_main ${variant}`} to={to}>
            {children}
        </Link>
    )
}

export default ButtonLink;