// auth schema

import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email required").email(`Invalid Email Format`),
  password: yup
    .string()
    .required(`Password required`)
    .min(8, `Password must be at least 8 characters.`),
});

export const signupSchema = yup.object({
  username: yup
    .string()
    .required(`Username required`)
    .min(3, `Username must be between 3-16 characters`)
    .max(16, `Username must be between 3-16 characters`),
  email: yup.string().required("Email required").email(`Invalid Email Format`),
  password: yup
    .string()
    .required(`Password required`)
    .min(8, `Password must be at least 8 characters.`),
});
