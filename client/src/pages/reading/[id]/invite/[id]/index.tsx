import { useParams } from "react-router-dom"

export const ReadingInviteId = () => {

    const { rid, iid } = useParams();

    return (
        <div>{rid}{iid}</div>
    )
}