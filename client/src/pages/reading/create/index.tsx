import "./style.css";

export const ReadingCreate = () => {
    return (
        <div className="create_reading_body">
            <form className="create_reading_form">
                <label>
                    <input type="text" placeholder="Name"/>
                </label>
                <label>
                    <textarea placeholder="Description"/>
                </label>
                <label>
                    <input type="email" placeholder="Email"/>
                </label>
                <button>Create Reading</button>
            </form>
        </div>
    )
}