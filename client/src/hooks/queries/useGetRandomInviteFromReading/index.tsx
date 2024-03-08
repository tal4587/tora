import { useQuery } from "@tanstack/react-query"
import instance from "../../../utils/axios";
import { InviteData } from "../../../types/invite";

const useGetRandomInviteFromReading = (reading_id: string) => {
    return useQuery({
        queryKey: ["reading-random-invite", reading_id],
        queryFn: () => {
            const url = `/reading/${reading_id}/invite/random`;
            return instance.get<InviteData>(url);
        },
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}

export default useGetRandomInviteFromReading;