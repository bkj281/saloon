// import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from './layout/Layout';

// pages
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ShopDetails from './pages/ShopDetails';
import Login from './components/Login';
import Register from './components/Register';
import SaloonRegistration from './pages/SaloonRegistration';
import MyInfo from './pages/MyInfo';
import MyOrders from './pages/MyOrders';

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} exact />
				<Route path="/about" element={<About />} />
				<Route path="/shop/:id" element={<ShopDetails />} />

				{/* login form path */}
				<Route path="/login" element={<Login />} />

				{/* register form path */}
				<Route path="/register" element={<Register />} />
				<Route path="/registerSaloon" element={<SaloonRegistration />} />
				<Route path='*' element={<NotFound />} />

				<Route path="/myInfo/:id" element={<MyInfo />} />
				<Route path='/orders/:_id' element={<MyOrders />} />
			</Routes>
		</Layout>
	);
};

export default App;