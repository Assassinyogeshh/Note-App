import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup.string().min(4).max(26).required('Please Enter Your Name'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(6).required('Please Enter Your Password'), 
  Cpassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords Must Match')
});

export const signInSchema = yup.object({

email:yup.string().required('Please Enter Your Name'),
password:yup.string().required('Please Enter Your Password')
  
})

// export const askQuestions= yup.object({
//   // title:yup.string().required('Please Fie/')
// })