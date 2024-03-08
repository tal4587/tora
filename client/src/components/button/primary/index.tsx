import { MouseEventHandler } from "react";
import "./style.css";

type ButtonPrimaryProps = {
    variant?: "filled" | "stroke",
    children?: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
}

const ButtonPrimary = ({ children, variant = "filled", onClick, disabled }: ButtonPrimaryProps) => {
    return (
        <button disabled={disabled} className={`button_primary_main ${variant}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonPrimary;