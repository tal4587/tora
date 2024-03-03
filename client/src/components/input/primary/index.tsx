import { forwardRef } from "react";
import "./style.css"

type InputPrimaryProps = {
    type?: React.HTMLInputTypeAttribute,
    placeholder?: string,
    label?: React.ReactNode,
}

const InputPrimary = forwardRef(({ type, placeholder, label }: InputPrimaryProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
        <label className="input_primary_body">
            <p className="input_primary_label">{label}</p>
            <div>
                <input className="input_primary_main" ref={ref}
                 type={type} placeholder={placeholder} />
            </div>
        </label>
    )
})

export default InputPrimary;