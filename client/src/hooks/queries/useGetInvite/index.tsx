import { useQuery } from "@tanstack/react-query";
import instance from "../../../utils/axios";
import { InviteData } from "../../../types/invite";

const useGetInvite = (invite_id: string) => {
    return useQuery({
        queryKey: ["invite", invite_id],
        queryFn: () => {
            return instance.get<InviteData>(`/invite/${invite_id}`)
        }
    })
}

export default useGetInvite;