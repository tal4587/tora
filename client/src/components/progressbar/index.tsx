import "./style.css"

type ProgressBarProps = {
    percentage: number
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {

    const style:React.CSSProperties = {
        width: `${percentage}%`
    }

    return (
        <div className="progress_bar_body">
            <div style={style} className="progress_bar_bar"></div>
        </div>
    )
}

export default ProgressBar;