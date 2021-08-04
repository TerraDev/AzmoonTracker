import React,{useRef} from 'react'
import '../../styles/Forms.css'
import {useForm} from "react-hook-form"
import RegisterUser from "../../adapters/User/PostRegister"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Register() {

    const validationSchema = Yup.object().shape({
        Username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        Email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        Password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
        ConfirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('Password'), null], 'Confirm Password does not match'),
        //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)}) ;


    const onSubmit = async (data) =>
    {
        console.log(data);
        const response = await RegisterUser();
        //this.setState({
        //  exams: response.data,
        //})
        console.log(response.data);
    }

    return (
            <form className="form1" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" id="Username" placeholder="Enter Username" name="Username"
                    {...register("Username")}/>
                </div>
                {errors.Username && <p>{errors.Username.message}</p>}
                <br/>

                <div>
                    <label>Email:</label>
                    <input type="email" id="Email" placeholder="example@example.com" name="Email"
                    {...register("Email")}/>
                </div>
                {errors.Email && <p>{errors.Email.message}</p>}
                <br/>

                <div>
                    <label>Password:</label>
                    <input type="password" id="Password" placeholder="Enter Password" name="Password"
                    {...register("Password")}/>
                </div>
                {errors.Password && <p>{errors.Password.message}</p>}
                <br/>

                <div>
                    <label>Confirm password:</label>
                    <input type="password" id="ConfirmPassword" placeholder="Re-enter Password" name="ConfirmPassword"
                    {...register("ConfirmPassword")}/>
                </div>

                {errors.ConfirmPassword && <p>{errors.ConfirmPassword.message}</p>}
                <br/>

                <button type="submit" >submit</button>
            </form>
    )
}