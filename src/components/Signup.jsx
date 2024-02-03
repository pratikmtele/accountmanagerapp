import React from 'react';
import { Input, Button } from './index';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup as userSignup } from '../redux/slices/userSlice';

function Signup({ showAlert }) {
    const navigate = useNavigate(); // Getting navigation object from react-router-dom
    const dispatch = useDispatch();  // Getting dispatch object from react-redux
    const { register, handleSubmit, formState } = useForm();   // Getting register and handleSubmit functions from react-hook-form
    const { errors } = formState;

    // Function to handle signup form submission
    const signup = (data) => {
        dispatch(userSignup(data));    // Dispatching signup action with form data
        showAlert("Congratulations, your account has been successfully created.", "success");
        navigate("/");  // navigating to login page after successful signup
    }

    return (
        <div className='container shadow p-5 mt-5'>
            <h2 className='text-center font-bold'>Create a Account</h2>
            <p className='text-center'>Already have an account?&nbsp;<Link className="text-primary link-underline-light" to="/">Login</Link></p>
            <form onSubmit={handleSubmit(signup)}>
                <Input
                    label='Full Name: '
                    placeholder='Enter your full name'
                    type='text'
                    {...register("fullname", {
                        required: {
                            value: true,
                            message: 'Full name is Required'
                        },
                        minLength: 5
                    })}
                />
                <p className='text-danger'>{errors.fullname?.message}</p>

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
                    })}
                />
                <p className='text-danger'>{errors.email?.message}</p>

                <Input
                    label='Mobile No. :'
                    placeholder='Enter your mobile number'
                    type='number'
                    {...register("mobileno", {
                        required: {
                            value: true,
                            message: 'Mobile number is Required'
                        },
                        validate: {
                            matchPattern: (value) => /^\d{10}$/.test(value) || "Enter valid mobile number"
                        }
                    })}
                />
                <p className='text-danger'>{errors.mobileno?.message}</p>

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

                <Button type='submit' children='Sign Up' className='w-100' />
            </form>
        </div>
    )
}

// Exporting the signup component 
export default Signup
