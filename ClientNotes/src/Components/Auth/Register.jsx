import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useFormik } from 'formik';
import { signUpSchema } from './UserSchema';
import axios from 'axios';


function Register() {

  const navigate=useNavigate();
  
  const initialValues = {
    name: "",
    email: "",
    password: "",
    Cpassword: "",
  };

  // console.log(initialValues);

  const {handleChange, handleSubmit, errors, values, touched}= useFormik({
    initialValues,
    validationSchema:signUpSchema,
    onSubmit:async(values, Action)=>{
      try {
        
        console.log(values);

        const apiUrl = "http://localhost:3000";

        const response= await axios.post(`${apiUrl}/Auth/register`, values)

        if(response.status===200){
          alert("Registered Successfully")
        }
        Action.resetForm();
        navigate('/') 
      } catch (error) {
        console.log(error);
       
         if( error.response.status === 409){
          alert("User Already Exist")
        }else if(error.response.status === 400){
          alert("Confirm Password Should Match")
        } else{
            alert("Registration Failed")
        }
      }
    }
    // debug: true,
  })
   
  return (
    <>


      <div className="main_register">


        <div className="Register_box">
         
          <form className='Register_page' onSubmit={handleSubmit}>
            <label htmlFor="name">UserName</label>
            <input type="text" name="name" value={values.name} id="name" onChange={handleChange} required  autoComplete="on" />
            {errors.name && touched.name ? (<p className='form_errors'>{errors.name}</p>) : null}
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={values.email} id="email" onChange={handleChange} required  autoComplete="on" />
            {errors.email && touched.email ? (<p className='form_errors'>{errors.email}</p>) : null}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={values.password} id="password" onChange={handleChange} required  autoComplete="on" />
            {errors.password && touched.password ? (<p className='form_errors'>{errors.password}</p>) : null}
            <label htmlFor="Cpassword">Confirm Password</label>
            <input type="password" name="Cpassword" value={values.Cpassword} id="Cpassword" onChange={handleChange} required  autoComplete="on" />
            {errors.Cpassword && touched.Cpassword ? (<p className='form_errors'>{errors.Cpassword}</p>) : null}

            <button type='submit' className="Register_Btn">Register</button>

            <span className='signUp_page'>Already have an account? <Link style={{ color: '#007ac6', textDecoration: 'none' }} to={'/'}>

              <p>Login</p> </Link>

            </span>
          </form>
        </div>

      </div>





    </>
  )
}

export default Register



