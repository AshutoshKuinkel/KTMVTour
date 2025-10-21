import { IUser } from '../types/user.types'
import api from './index'

export const updateProfileAPI = async(data:IUser)=>{
  try{
    const response = await api.put('/user/updateProfile',data)
    return response.data
  }catch(err:any){
    throw err.response.data
  }
}