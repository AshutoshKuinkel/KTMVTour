import bcrypt from 'bcrypt';

const saltRounds = 10

export const HashPassword = async(password:string)=>{
  const salt = await bcrypt.genSaltSync(saltRounds)
  return await bcrypt.hashSync(password,salt)
}