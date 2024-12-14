import axios from 'axios'
import {Cutie} from "../@types";

const api = axios.create({
    baseURL: "http://localhost:5000"
})

export const getCuties = async () => {
    return (await api.get<Cutie[]>("/cuties")).data
}
export const createCutie = async (cutie:Cutie) => {
    return (await api.post("/createcutie",cutie)).data
}