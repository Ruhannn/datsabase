import type { Cutie } from '../@types'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

export async function getCuties() {
  return (await api.get<Cutie[]>('/cuties')).data
}
export async function createCutie(cutie: Cutie) {
  return (await api.post('/createcutie', cutie)).data
}
