// auth schema

import * as yup from 'yup'


export const loginSchema = yup.object({
  email: yup.string().required('Email required').email(`Invalid Email Format`),
  password: yup.string().required(`Password required`).min(8,`Password must be at least 8 characters.`)
})