import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import CartItems from '../components/CartItem';
import HomeCaraousel from '../components/HomeCaraousel';
import Services from '../components/Services';
import ServiceTable from '../components/ServiceTable';

import { listShopDetails } from '../actions/shopActions';
import { useState } from 'react';


function ShopDetails() {
	const params = useParams();
	const { id } = params
	const dispatch = useDispatch()
	const [flag, setFlag] = useState(false);
	const [services, setServices] = useState([]);
	const [serviceType, setServiceType] = useState('HairCutting');
	const [active, setActive] = useState('HairCutting');

	const shopDetails = useSelector((state) => state.shopDetails)
	const { loading, error, shop } = shopDetails

	useEffect(() => {
		if (!shop._id || shop._id !== id) {
			dispatch(listShopDetails(id));
		}
		if (shop.ServiceId) {
			setFlag(true);
			setServices(Object.keys(shop.ServiceId));
		}

	}, [dispatch, shop?.ServiceId, shop?._id, id])
	// console.log(services)
	const handleServiceClick = (id) => {
		setServiceType(id);
		setActive(id);
	}
	if (serviceType === '') {
		setServiceType('HairCutting')
	}
	return (
		<div>
			<HomeCaraousel />

			<div className="container mt-5 mb-5">
				{error && <Message>{error}</Message>}
				{loading && <Loader />}
				<div className="row">
					<div className="col-2" md={2}>
						{services && <Services shopName={shop.ShopName} handleServiceClick={handleServiceClick} services={services} active={active} />}
					</div>
					<div className="col-md-7">
						{/* {flag?console.log(shop.ServiceId, serviceType):console.log(0)} */}
						{flag?<ServiceTable services={shop.ServiceId} serviceType={serviceType} />: null}
					</div>
					<div className="col-md-3">
						<CartItems />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShopDetails;
