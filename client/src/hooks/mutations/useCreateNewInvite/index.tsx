import { useMutation } from "@tanstack/react-query"
import axios from "../../../utils/axios";
import { InviteBody, InviteData } from "../../../types/invite";
import { AxiosResponse } from "axios";

const useCreateNewInvite = (reading: string) => {
    return useMutation({
        mutationFn: (body: InviteBody) => {
            return axios.post<InviteBody, AxiosResponse<InviteData>>(`/reading/${reading}/invite`, body);
        }
    })
}

export default useCreateNewInvite;