import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createCutie, getCuties} from "./api.ts";
import {Cutie} from "../@types";

export const useCuties = () => {
    return useQuery({
        queryKey: ["cuties"],
        queryFn: getCuties,
    })
}
export function useCreateCutie() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (cutie: Cutie) => createCutie(cutie),
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("error");
        },
        onSuccess: () => {
            console.log("success");
        },
        onSettled: async (_, error) => {
            console.log("settled");
            if (error) {
                console.log(error)
            } else {
                await qc.invalidateQueries({queryKey: ["cuties"]})
            }
        }
    })
}