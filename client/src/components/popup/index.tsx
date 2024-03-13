import CloseIcon from "../../assets/svgs/Close";
import "./style.css"

type PopUpProps = {
    showPopUp: boolean,
    setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
}

const PopUp = ({ showPopUp, setShowPopUp, children}: PopUpProps) => {
    return (
        <div className="popup_body">
            { showPopUp && (
                <>
                <div className="popup_click_to_exit" onClick={() => setShowPopUp(false)}></div>
                <div className="popup_modal">
                    <div className="popup_close_button" onClick={() => setShowPopUp(false)}>
                        <CloseIcon/>
                    </div>
                    {children}
                </div>
                </>
            )}
        </div>
    )
}

export default PopUp;