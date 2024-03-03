import { ChangeEventHandler, FormEventHandler, HTMLInputTypeAttribute } from "react";
import "./style.css";

type InputPrimaryFormProps = {
    type?: HTMLInputTypeAttribute,
    icon?: React.ReactNode
    placeholder?: string,
    onSubmit?: FormEventHandler<HTMLFormElement>,
    value?: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    disabled?: boolean,
}

const InputPrimaryForm = ({ type = "text", placeholder, onSubmit,
    value, onChange, disabled, icon }: InputPrimaryFormProps) => {
    return (
        <form className="input_primaryform_form_body" onSubmit={onSubmit}>
            { icon && <button className="input_primaryform_button" type="submit" disabled={disabled}>{icon}</button> }
            <input
                className="input_primaryform_main"
                value={value} onChange={onChange}
                type={type} placeholder={placeholder} />
        </form>
    )
}

export default InputPrimaryForm;