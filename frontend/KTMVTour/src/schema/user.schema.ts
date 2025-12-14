import * as yup from 'yup';

export const profileSchema = yup.object({
  email: yup.string().email('Invalid Email Format').optional(),
  username: yup.string().optional(),
  password: yup.string().optional(),
  // profile picture {add this on later aswell}
})