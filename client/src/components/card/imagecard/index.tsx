import "./style.css"

type ImageCardProps = {
    href: string,
    alt?: string,
    variant?: "solid" | "glass",  
    padding?: string,
}

const ImageCard = ( { href, alt, variant = "solid", padding = "1em" }: ImageCardProps) => {

    const styles:React.CSSProperties = {
        padding
    };

    return (
        <div style={styles} className={`image_card_main ${variant}`}>
            <img src={href} alt={alt}/>
        </div>
    )
}

export default ImageCard