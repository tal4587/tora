import { MouseEventHandler } from "react";
import "./style.css";

type ButtonPrimaryProps = {
    variant?: "filled" | "stroke",
    children: React.ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const ButtonPrimary = ({ children, variant = "filled", onClick }: ButtonPrimaryProps) => {
    return (
        <button className={`button_primary_main ${variant}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonPrimary;