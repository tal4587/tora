import { useMutation } from "@tanstack/react-query"
import instance from "../../../utils/axios";
import { InviteData } from "../../../types/invite";
import { AxiosResponse } from "axios";

const useEditInviteStatus = (invite_id: string) => {
    return useMutation({
        mutationFn: (status: string) => {
            return instance.put<{status: string}, AxiosResponse<InviteData>>(`/invite/${invite_id}`, {
                status
            })
        }
    })
}

export default useEditInviteStatus;