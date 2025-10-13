import mongoose, { Schema } from "mongoose"


export interface JWTPayload{
  _id: Schema.Types.ObjectId,
  email:string,
  username:string,
  profilePicture?:string | null
}