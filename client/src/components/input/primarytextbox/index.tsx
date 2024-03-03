import { forwardRef } from "react";
import "./style.css"

type InputPrimaryTextboxProps = {
    placeholder?: string,
}

const InputPrimaryTextbox = forwardRef(({ placeholder }: InputPrimaryTextboxProps, ref: React.LegacyRef<HTMLTextAreaElement>) => {
    return (
        <label className="input_primary_textbox_body">
            <textarea className="input_primary_textbox_main" ref={ref} placeholder={placeholder}/>
        </label>
    )
})

export default InputPrimaryTextbox;