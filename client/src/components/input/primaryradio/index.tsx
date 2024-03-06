import "./style.css";

type InputPrimaryRadioProps = {
    checked: boolean,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    label: string,
}

const InputPrimaryRadio = ({ checked, onChange, label }: InputPrimaryRadioProps) => {
    return (
        <label className="input_primary_radio_body">
            <p className="input_primary_radio_label">{label}</p>
            <input className="input_primary_radio_main" checked={checked} onChange={onChange} type="radio" />
        </label>
    )
}

export default InputPrimaryRadio;