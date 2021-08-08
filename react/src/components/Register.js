import { useState, useEffect } from "react";
import history from '../History';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './Register.css';


function Register () {

    const { errors, register, handleSubmit } = useForm();
    const [isAuth, setIsAuth] = useState(true);
    useEffect(() => {
        if (!isAuth) {
            alert('this email is alreay registered');
            setIsAuth(true);
        }
    }, [isAuth])

    const onSubmit = data => {
        axios.post('http://localhost:5000/api/user/signup', data)
            .then(response => {
                alert('user created')
                history.push('/login')
            })
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex justify-content-center" style={{ marginTop: "100px", marginBottom: "265px" }}>
                <div id="box" >
                    <div className="d-flex flex-column mt-2" >
                        <h1 className="form-group align-self-center mt-5" style={{ fontWeight: "bold" }}>Signup</h1>
                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-4"
                            type="text"
                            placeholder="Email"
                            name="email"
                            ref={register({ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                        />
                        <div className="validations-error">
                            {errors.email && errors.email.type === "required" && (<h5>Email is required</h5>)}
                            {errors.email && errors.email.type === "pattern" && (<h5>Must be Type of an Email</h5>)}
                        </div>
                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                            type="text"
                            placeholder="Password"
                            name="password"
                            ref={register({ required: true, minLength: 2 })}
                        />
                        <div className="validations-error">
                            {errors.password && errors.password.type === "required" && (<h5>Password is required</h5>)}
                            {errors.password && errors.password.type === "minLength" && (<h5>Min Lenght of 2</h5>)}
                        </div>
                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                            type="text"
                            placeholder="Nick Name"
                            name="nickname"
                            ref={register({ required: true, minLength: 2 })}
                        />
                        <div className="validations-error">
                            {errors.nickname && errors.nickname.type === "required" && (<h5>Nickname is required</h5>)}
                            {errors.nickname && errors.nickname.type === "minLength" && (<h5>Min Lenght of 2</h5>)}
                        </div>
                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                            type="text"
                            placeholder="First Name"
                            name="firstname"
                            ref={register({ required: true, minLength: 2 })}
                        />
                        <div className="validations-error">
                            {errors.firstname && errors.firstname.type === "required" && (<h5>Firstname is required</h5>)}
                            {errors.firstname && errors.firstname.type === "minLength" && (<h5>Min Lenght of 2</h5>)}
                        </div>
                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                            type="text"
                            placeholder="First Name"
                            name="lastname"
                            ref={register({ required: true, minLength: 2 })}
                        />
                        <div className="validations-error">
                            {errors.lastname && errors.lastname.type === "required" && (<h5>Lastname is required</h5>)}
                            {errors.lastname && errors.lastname.type === "minLength" && (<h5>Min Lenght of 2</h5>)}
                        </div>
                        <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            ref={register({ required: true, minLength: 2 })}
                        />
                        <div className="validations-error">
                            {errors.phone && errors.phone.type === "required" && (<h5>Phone is required</h5>)}
                            {errors.phone && errors.phone.type === "minLength" && (<h5>Min Lenght of 2</h5>)}
                        </div>
                        <input className="login d-flex align-self-center w-50 mt-2" type="submit" value="Signup" />
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Register;