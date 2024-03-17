import { forwardRef } from "react";
import "./style.css";

type InputPrimarySelectProps = {
    options: string[],
}

const InputPrimarySelect = forwardRef(({ options }: InputPrimarySelectProps, ref: React.LegacyRef<HTMLSelectElement> ) => {
    return (
        <select ref={ref} className="input_primary_select_body">
            { options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
            ))}
        </select>
    )
})

export default InputPrimarySelect;