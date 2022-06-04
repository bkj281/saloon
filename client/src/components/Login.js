import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// login action
import { login } from '../actions/userActions';
import Loader from './Loader';
import Message from './Message';
const Login = () => {
    
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(()=>{
        if(userInfo){
            if (userInfo.user.Role === 'user')
                navigate("/");
            else if (userInfo.user.Role === 'shopkeeper')
                navigate(`/shopkeeper/${userInfo.user._id}`);
        }
    }, [navigate, userInfo])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <div className="container">
            {loading && <Loader/>}     
            {error && <Message>{error}</Message>}
            <div className="row m-3 no-gutters shadow align-content-center w-75 mx-auto">
                <div className="col-md-6 m-auto p-5">
                    <h3 className="pb-3">Login Form</h3>
                    <div className="form-style">
                        <form onSubmit={submitHandler}>
                            <div className="form-group pb-3">    
                                <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>   
                            </div>
                            <div className="form-group pb-3">   
                                <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div><a href="/forget">Forget Password?</a></div>
                            </div>
                            <div className="pb-2">
                                <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2">Submit</button>
                            </div>
                        </form>
                        <div className="pt-4 text-center">
                            Get Members Benefit. <a href="/register">Register</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-block ">
                    <img alt="login" src="https://images.unsplash.com/photo-1621607505833-616916c46a25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFyYmVyJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" className="img-fluid" style={{minHeight:'100%',objectFit:'contain'}} />
                </div>
            </div>
        </div>
    )
}

export default Login
