import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// register action
import { register } from '../actions/userActions';
import Loader from './Loader';
import Message from './Message';
const Register = () => {

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister;

	const navigate = useNavigate();
	const [Role, setRole] = useState("user")
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [city, setCity] = useState('');
	const [cityState, setCityState] = useState('');
	const [PinCode, setPinCode] = useState('');
	const [phoneNo, setPhoneNo] = useState('');

	useEffect(() => {

		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo])

	const submitHandler = (e) => {
		e.preventDefault();
		if (phoneNo.length !== 10) {
			alert('Invalid Phone Number.');
			return;
		} else if (PinCode.length !== 6) {
			alert('Invalid Pin Code.');
			return;
		} else if (password !== confirmPassword) {
			return alert('Password didn\'t match!');
		} else {
			dispatch(register(
				name, email, password, city, cityState, phoneNo, PinCode, Role
			));
			alert('Registered!');
			navigate('/login');
		}
	}

	return (
		<div className="container">
			{loading && <Loader />}
			{error && <Message>{error}</Message>}
			<div className="row m-3 no-gutters shadow align-content-center w-75 mx-auto">

				<div className="col-md-6 m-auto p-5">
					<h3 className="pb-3">Register Form</h3>
					<div className="form-style">
						<form onSubmit={submitHandler}>
							<div className="form-group pb-3 d-flex ">
								<div className="form-check mx-2">
									<input className="form-check-input" checked={Role === "user"} onChange={(e) => setRole(e.target.value)} type="checkbox" value="user" id="flexCheckDefault" />
									<label className="form-check-label">
										User
									</label>
								</div>
								<div className="form-check mx-2">
									<input className="form-check-input" type="checkbox" checked={Role === "shopkeeper"} onChange={e => setRole(e.target.value)} value="shopkeeper" id="flexCheckDefault" />
									<label className="form-check-label" >
										Shop Keeper
									</label>
								</div>
							</div>
							<div className="form-group mt-2">
								<input type="text" placeholder="Name" onChange={e => setName(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="form-control" />
							</div>
							<div className="form-group mt-2">
								<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="password" placeholder="Confirm Your Password" onChange={e => setConfirmPassword(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="text" placeholder="City" onChange={e => setCity(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="text" placeholder="State" onChange={e => setCityState(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="number" min={100000} placeholder="Pin Code" onChange={e => setPinCode(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="number" min={6000000000} placeholder="Phone Number" onChange={e => setPhoneNo(e.target.value)} className="form-control" required />
							</div>

							<div className="pb-2">
								<button type="submit" className="btn btn-warning w-100 font-weight-bold mt-2">Submit</button>
							</div>
						</form>
						<div className="pt-4 text-center">
							Already a member ?  <a href="/login">Login</a>
						</div>
					</div>
				</div>
				<div className="col-md-6 d-none d-md-block ">
					<img alt="login" src="https://images.unsplash.com/photo-1621607505833-616916c46a25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFyYmVyJTIwc2hvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" className="img-fluid" style={{ minHeight: '100%', objectFit: 'contain' }} />
				</div>
			</div>
		</div>
	)
}

export default Register
