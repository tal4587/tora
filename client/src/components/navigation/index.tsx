import "./style.css";

type NavigationProps = {
    left?: React.ReactNode,
    center?: React.ReactNode,
    right?: React.ReactNode,
    solid?: boolean
}

const Navigation = ({ left, center, right, solid}: NavigationProps) => {

    return (
        <nav className={`navigation_body ${solid && "solid"}`}>
            <div className="navigation_wrapper">
                <div className="navigation_left">{left}</div>
                <div className="navigation_center">{center}</div>
                <div className="navigation_right">{right}</div>
            </div>
        </nav>
    )
}

export default Navigation;