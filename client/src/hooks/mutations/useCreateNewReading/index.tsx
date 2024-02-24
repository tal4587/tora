import { useMutation } from "@tanstack/react-query"
import axios from "../../../utils/axios"
import { ReadingBody, ReadingData } from "../../../types/reading"
import { AxiosResponse } from "axios"

const useCreateNewReading = () => {
    return useMutation({
        mutationFn: (body: ReadingBody) => {
            return axios.post<ReadingBody, AxiosResponse<ReadingData>>("/reading/", body)
        }
    })
}

export default useCreateNewReading;