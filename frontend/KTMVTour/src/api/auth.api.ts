// auth api
import axios from 'axios'
import { ILoginData } from '../types/auth.types'

export const loginAPI = async(data:ILoginData)=>{
  try{
    const response = await axios.post('http://localhost:8080/api/auth/login',data)
    return response.data
  }catch(err:any){
    if (err?.response) {
      throw err.response.data;
    } else {
      throw new Error('Network or Server Error');
    }
  }
}