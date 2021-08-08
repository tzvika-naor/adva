import { useState } from 'react';
import axios from 'axios';
import history from '../History';
import Spinner from 'react-bootstrap/Spinner'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import './Login.css';


const Login = (props) => {
   
    const [toDelete, setToDelete] = useState(false)
    const [resetPassword, setResetPassword] = useState(false);
    const { errors, register, handleSubmit } = useForm();

    const onSubmit = (data, event) => {
     
        console.log(event.target.value)
      
        if (resetPassword === false) { // Login !!!!!!!
         
            axios.post('http://localhost:5000/api/user/login', data)
             
            .then(response => {
                   
                    const user = response.data.user;
                   
                    if (response.data.user) {
                       
                        props.setConnectedUser(user)    
                       
                        localStorage.setItem("user", JSON.stringify(user));

                        setTimeout(() => {
                            history.push('./smartphones')
                        }, 200);
                    }
                }, error => { console.log(error)
                    if (error.response.status === 401) {
                        alert('wrong password or email. click forgot password for reset')
                    }
                })
        }
        else {
            //update!!! we want to update!!!!!!
            if (!toDelete) {
                axios.put('http://localhost:5000/api/user/update', data).then(response => {
                    alert('user password updated!')
                })
                setResetPassword(false)
            }
            //delete
            else { // we want to delete !!!!!
                console.log('on delete')

                fetch('http://localhost:5000/api/user/deleteUser', {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                    },
                    body: JSON.stringify(data)
                }).then(response => {
                    if (response.status === 200)
                        alert('user has been deleted')
                    if (response.status === 500)
                        alert('cannot delete user email and password does not match')
                    if (response.status === 401)
                        alert('cannot delete user email and password does not match')
                }
                    , error => {
                        console.log(error)
                    })
            }
        }
    }
    const resetCredentials = () => {
        setResetPassword(!resetPassword)
    }
    const deleteUser = (e) => {
        setToDelete(!toDelete)
    }

    return (
       
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="wrapper" className="d-flex justify-content-center" style={{ marginTop: "100px", marginBottom: "645px" }}>
                    <div className="box">
                        <div className="form-group">
                            <div className="d-flex flex-column mt-5">
                                {!resetPassword ? <h1 className="align-self-center" style={{ fontWeight: "bold" }}>Login</h1> :
                                    <h1 className="align-self-center" style={{ fontWeight: "bold" }}>Reset Password</h1>}
                                <input className="form-control form-control-lg align-self-center w-75 mb-3 mt-2"
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
                                    ref={register({ required: true, minLength: 4 })}
                                />
                                <div className="validations-error">
                                    {errors.password && errors.password.type === "required" && (<h5>Password is required</h5>)}
                                    {errors.password && errors.password.type === "minLength" && (<h5>Min Lenght of 4</h5>)}
                                </div>
                                {!resetPassword ?
                                    <input className="login align-self-center mt-5" type="submit" value="Login" /> :
                                    !toDelete ?
                                        <input className="login align-self-center mt-5" type="submit" value="Reset" />
                                        : <input className="delete align-self-center mt-4 mb-4" type="submit" value="Delete"
                                        />
                                }
                                {!resetPassword ?
                                    <Link to="#" className="link align-self-center" onClick={resetCredentials}>Forgot password?</Link> :
                                    <div className="d-flex justify-content-center">
                                        <Link to="#" className="link" onClick={resetCredentials} style={{ marginRight: "20px" }}>Login?</Link>
                                        {!toDelete ?
                                            <Link to="#" className="link" onClick={deleteUser} style={{ marginLeft: "20px" }}>Delete User</Link> :
                                            <Link to="#" className="link" onClick={deleteUser} style={{ marginLeft: "20px" }}>Reset</Link>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}


export default Login;