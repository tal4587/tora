import { FormEvent, useRef } from "react";
import useCreateNewReading from "../../../hooks/mutations/useCreateNewReading";
import { ReadingBody } from "../../../types/reading";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const ReadingCreate = () => {

    const { mutate, data, isError } = useCreateNewReading();
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const email = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        let body: ReadingBody = {};
        if(name.current && name.current.value.length !== 0) {
            body = {...body, name: name.current.value}
        }
        if(email.current && email.current.value.length !== 0) {
            body = {...body, email: email.current.value}
        }
        if(description.current && description.current.value.length !== 0) {
            body = {...body, description: description.current.value}
        }
        mutate(body, {
            onSuccess: (data) => {
                navigate(`/reading/${data.data.reading._id}`)
            }
        });
    }
    
    return (
        <div className="create_reading_body">
            <form onSubmit={onSubmit} className="create_reading_form">
                <label>
                    <input ref={name} type="text" placeholder="Name"/>
                </label>
                <label>
                    <textarea ref={description} placeholder="Description"/>
                </label>
                <label>
                    <input ref={email} type="email" placeholder="Email"/>
                </label>
                <button>Create Reading</button>
                {!isError && JSON.stringify(data?.data)}
            </form>
        </div>
    )
}