import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { logout } from '../actions/userActions';
const Menu = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin;
	// console.log("userInfo",userInfo)
	const logoutHandler = () => {
		dispatch(logout());
	}
	let stl;
	if (userInfo) {
		stl = { left: '-140px' };
	} else {
		stl = { left: '-50px' };
	}


	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					<img src={logo} alt='logo' className='mx-3' style={{ width: '2.2rem', height: 'auto' }} />
					ApniSaloon
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								id="navbarDropdown"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Account
							</a>
							<div className="dropdown-menu" style={stl} aria-labelledby="navbarDropdown">
								{
									!userInfo && (
										<>
											<a className="dropdown-item" href="/login">
												Login
											</a>
											<a className="dropdown-item" href="/register">
												Register
											</a>
										</>
									)
								}
								{
									userInfo && (
										<>
											<a className="dropdown-item" href={`/myInfo/${localStorage.getItem('user')}`}>
												My Info
											</a>
											<a className="dropdown-item" href={`/orders/${localStorage.getItem('user')}`}>
												My Orders
											</a>
											{
												userInfo.user.Role === "shopkeeper" && (
													userInfo?.user.ShopId?.ShopName ? <a className="dropdown-item" href='/registerSaloon'>+ Add Another Saloon</a>
														: <a className="dropdown-item" href='/registerSaloon'>Register Your Saloon Here</a>
												)
											}
											<a className="dropdown-item" href='/' onClick={logoutHandler}>Logout</a>

										</>
									)
								}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
