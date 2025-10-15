// using this file to create an instance
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials:true
})

export default instance

