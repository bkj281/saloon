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
import MyInfoEdit from './pages/MyInfoEdit';
import MyOrders from './pages/MyOrders';
import ForgotPassword from './pages/ForgotPassword';

// Shopkeeper
import ShopHome from './shopkeeper/ShopHome';

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
				<Route path="/myInfo/:id/edit" element={<MyInfoEdit />} />
				<Route path='/orders/:_id' element={<MyOrders />} />

				<Route path='/shopkeeper/:_id' element={<ShopHome />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</Layout>
	);
};

export default App;
