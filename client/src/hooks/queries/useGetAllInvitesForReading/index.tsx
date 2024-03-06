import { useQuery } from "@tanstack/react-query"
import axios from "../../../utils/axios"
import { InvitesData } from "../../../types/invite"

type QueryParams = {
    status: string
}

const useGetAllInviteForReadingWithStatus = (reading_id: string, { status }: QueryParams) => {
    return useQuery({
        queryKey: ["reading-invite", reading_id],
        queryFn: () => {
            const url = `/reading/${reading_id}/invite?status=${status}`
            return axios.get<InvitesData>(url);
        }
    })
}

export default useGetAllInviteForReadingWithStatus;