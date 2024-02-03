import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Button } from './index';
import { updateDetails } from '../redux/slices/userSlice';

function UserDetails({ showAlert }) {
    const [isDetailsEditable, setIsDetailsEditable] = useState(false);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            fullname: '',
            email: '',
            mobileno: ''
        }
    });

    useEffect(() => {
        setValue("fullname", userData.fullname);
        setValue("email", userData.email);
        setValue("mobileno", userData.mobileno);
    }, [userData])

    const editUserDetails = (data) => {
        setIsDetailsEditable((prev) => !prev);

        if (isDetailsEditable) {
            dispatch(updateDetails(data)); // Dispatching user data to updateDetails action
            showAlert("Account details updated successfully.", "success")   // Displaying success message after details update successful
        }
    }

    return (
        <div className='container shadow p-5 mt-5'>
            <h2 className='text-center font-bold'>Manage Your Account</h2>
            <form onSubmit={handleSubmit(editUserDetails)}>
                <Input
                    label='Full Name: '
                    placeholder='Enter your full name'
                    type='text'

                    disabled={isDetailsEditable ? false : true}
                    {...register("fullname", {
                        required: true,
                        minLength: 5
                    })}
                />

                <Input
                    label='Email: '
                    placeholder='Enter your email'
                    type='email'
                    disabled={isDetailsEditable ? false : true}
                    {...register('email', {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || "Email address must be valid address"
                        }
                    })}
                />

                <Input
                    label='Mobile No. :'
                    placeholder='Enter your mobile number'
                    type='number'
                    disabled={isDetailsEditable ? false : true}
                    {...register("mobileno", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\d{10}$/.test(value) || "Enter valid mobile number"
                        }
                    })}
                />

                <Button type='submit' children={isDetailsEditable ? 'Update' : 'Edit'} className='w-100' />
            </form>
        </div>
    )
}

export default UserDetails
