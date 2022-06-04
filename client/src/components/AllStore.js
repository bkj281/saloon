import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader';
import Message from './Message';

import { listShops } from '../actions/shopActions';


const AllStore = () => {
	const dispatch = useDispatch()
	const [search, setSearch] = useState("");

	const shopList = useSelector((state) => state.shopList)
	const { loading, error, shops } = shopList;

	const loadData = () => {
		dispatch(listShops(search))
	} 

	const searchShops = (e) => {
		e.preventDefault();
		// console.log(search);
		loadData()
	}

	useEffect(() => {
		loadData()
	}, [dispatch]);

	return (
		<>
			<form>
				<div className="container mt-5">
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-md-8">
							<div className="mb-3">
								<label for="exampleInputEmail1" className="form-label">
									Search By PinCode/City
								</label>
								<input
									type="text"
									className="form-control"
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
						<div className="col-md-2">
							<button type="submit" onClick={searchShops} className="btn mt-3 border-warning">
								Search
							</button>
						</div>
					</div>
				</div>
			</form>

			<div className="container mt-5">
				{loading && <Loader />}
				{error && <Message>{error}</Message>}
				{!loading && shops.length === 0 && <Message>{"No Saloons Available"}</Message>}
				<div className="row d-flex flex-wrap">
					{
						shops?.map((item) => (
							<div key={item._id} className="col-md-4 col-sm-1">
								<div className="card mb-3 mx-auto" style={{ width: '15rem', margin: "0rem auto" }}>
									<img
										src={item.shopImage}
										className="card-img-top"
										alt="Logo"
										style={{ height: '15rem' }}
									/>
									<div className="card-body">
										<h5 className="card-title">{item.ShopName}</h5>
										<p className="card-text">{item.openTiming} - {item.closeTiming}</p>
										<p className="card-text">{item.shopAddress},{' '}{item.shopPincode}</p>
										<Link to={`shop/${item._id}`} className="btn btn-warning">
											View
										</Link>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	);
};

export default AllStore;
