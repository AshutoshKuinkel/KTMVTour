// using this file to create an instance
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  withCredentials:true
})

export default instance

