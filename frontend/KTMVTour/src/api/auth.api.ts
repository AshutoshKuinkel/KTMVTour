// auth api
import { ILoginData, ISignupData } from '../types/auth.types'
import api from './index'

export const loginAPI = async(data:ILoginData)=>{
  try{
    const response = await api.post('/auth/login',data)
    return response.data
  }catch(err:any){
    if (err?.response) {
      throw err.response.data;
    } else {
      throw new Error('Network or Server Error');
    }
  }
}

export const signupAPI = async(data:ISignupData)=>{
  try{
    const response = await api.post('/auth/register',data)
    return response.data
  }catch(err:any){
    if (err?.response) {
      throw err.response.data;
    } else {
      throw new Error('Network or Server Error');
    }
  }
}