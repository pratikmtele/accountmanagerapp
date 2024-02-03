import React from 'react';
import { Input, Button } from './index';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login as userLogin } from '../redux/slices/userSlice';

function Login({ showAlert }) {
    // Getting navigation object from react-router-dom
    const navigate = useNavigate();
    // Getting dispatch object from react-redux
    const dispatch = useDispatch();
    // Getting register and handleSubmit functions from react-hook-form
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    // Function to handle login form submission
    const login = (data) => {
        dispatch(userLogin(data));  // Dispatching login action with form data
        showAlert("Logged in successfully", "success")
        navigate("/userdetails");   // navigating to userdetails page after successful login
    }

    return (
        <div className='container shadow p-5 mt-5'>
            <h2 className='text-center font-bold'>Sign in to your account</h2>
            <p className='text-center'>Don&apos;t have an account?&nbsp;<Link className="text-primary link-underline-light" to="/signup">Sign Up</Link></p>
            <form onSubmit={handleSubmit(login)}>
                <Input
                    label='Email: '
                    placeholder='Enter your email'
                    type='email'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Email is Required'
                        },
                        validate: {
                            matchPattern: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || "Email address must be valid address"
                        }
                    })} />
                <p className='text-danger'>{errors.email?.message}</p>

                <Input
                    label='Password: '
                    type='password'
                    placeholder='Enter your password'
                    {...register("password", {
                        required: {
                            value: true,
                            message: 'Password is Required'
                        },
                        minLength: 5
                    })} />
                <p className='text-danger'>{errors.password?.message}</p>


                <Button type='submit' children='Login' className='w-100' />
            </form>
        </div>
    )
}

// Exporting the login component
export default Login
