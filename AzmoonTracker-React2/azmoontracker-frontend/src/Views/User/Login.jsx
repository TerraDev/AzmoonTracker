import React from 'react'
import '../../styles/Forms.css'
import {useForm} from "react-hook-form"
import LoginUser from '../../adapters/User/Login'
import {storeToken} from '../../adapters/User/handleToken'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';


export default function Login(props) {

const validationSchema = Yup.object().shape({
    Email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    Password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters')
        .max(40, 'Password must not exceed 40 characters')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});

    const onSubmit = async (data) =>
    {
        console.log(data);
        const response = await LoginUser(data);
        //if (response.status == 400)
        console.log(response)
        console.log(response.status)
        console.log(response.data);
        storeToken(response.data);
        props.history.push("/");
        window.location.reload();
    }

    return (
            <form className="form1" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <input type="email" id="Email" placeholder="example@example.com" name="Email"
                    {...register("Email")}/>
                </div>
                {errors.Email && <p style={{color: "red"}}>{errors.Email.message}</p>}
                <br/>

                <div>
                    <label>Password:</label>
                    <input type="password" id="Password" placeholder="Enter Password" name="Password"
                    {...register("Password")}/>
                </div>
                {errors.Password && <p style={{color: "red"}}>{errors.Password.message}</p>}
                <br/>

                <button>submit</button>
            </form>
    )
}