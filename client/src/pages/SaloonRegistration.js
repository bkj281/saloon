import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerShop } from '../actions/shopActions';
// register action
import Loader from '../components/Loader';
import Message from '../components/Message';
const SaloonRegistration = () => {

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin;

	const navigate = useNavigate();
	const [Service, setService] = useState(false);
	const [ShopName, setShopName] = useState('');
	const [openTiming, setopenTiming] = useState('');
	const [closeTiming, setcloseTiming] = useState('');
	const [shopAddress, setshopAddress] = useState('');
	const [shopImage, setShopImage] = useState('');
	const [shopPincode, setshopPincode] = useState('');

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "saloon");
		formData.append("cloud_name", "dgbudt9vk");

		try {

			const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dgbudt9vk/image/upload', {
				method: "POST",
				body: formData,
			});
			const data = await cloudRes.json();
			console.log(data.secure_url);
			setShopImage(data.secure_url);
		} catch (error) {
			console.error(error)

		}
	}

	useEffect(() => {

		if (!userInfo) {
			navigate("/login");
		}
	}, [navigate, userInfo])

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log(shopImage);
		// console.log(ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming)
		dispatch(registerShop(localStorage.getItem('user'), ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming));
		alert('Registered!');
		navigate('/');
	}

	return (
		<div className="container">
			{loading && <Loader />}
			{error && <Message>{error}</Message>}
			<div className="row m-3 no-gutters shadow align-content-center w-100 mx-auto">

				<div className="col-md-6 m-auto p-5">
					<h3 className="pb-3">Saloon Registration</h3>
					<div className="form-style">
						<form onSubmit={submitHandler}>
							<div className="form-group pb-3">
								<input type="text" placeholder="Shop Name" onChange={(e) => setShopName(e.target.value)} value={ShopName} className="form-control" required />
							</div>
							<div className="form-group pb-3">
								<input required type="file" onChange={uploadFileHandler} placeholder="Shop Image" className="form-control" />
							</div>
							<div className="form-group pb-3">
								<input type="text" placeholder="Shop Open Timing" value={openTiming} onChange={(e) => setopenTiming(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group pb-3">
								<input type="text" placeholder="Shop Close Timing" value={closeTiming} onChange={(e) => setcloseTiming(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group pb-3">
								<input type="text" placeholder="Shop Address" onChange={(e) => setshopAddress(e.target.value)} value={shopAddress} className="form-control" required />
							</div>
							<div className="form-group pb-3">
								<input type="text" placeholder="Pin Code" onChange={(e) => setshopPincode(e.target.value)} value={shopPincode} className="form-control" required />
							</div>

							<div className="pb-2">
								<button type="submit" className="btn btn-warning w-100 font-weight-bold mt-2">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SaloonRegistration
