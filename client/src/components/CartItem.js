import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { removeFromCart } from '../actions/cartAction';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import Loader from './Loader';
// import Message from './Message';
import { useNavigate } from 'react-router-dom';

function CartItems() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();
  const store = useStore();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const { cartItems } = cart;
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  cart.TotalPrice = cartItems.reduce((acc, item) => acc + item.Price * 1, 0)
  const shopDetails = useSelector((state) => state.shopDetails)
  const { shop } = shopDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate)
  const { loading, success } = orderCreate;


  const handleBooking = async () => {

    if (!localStorage.getItem('user')) {
      alert('Login First!');
      navigate('/login');
    } 
    else if (!date || !time || time === "false") {
      return alert('Select Valid date & time');
    } 
    else {
      const ShopId = shop._id;
      const UserId = userInfo.user?._id;
      const ShopName = shop?.ShopName;
      const ShopAddress = shop?.shopAddress;
      const OrderData = { cart: cartItems, Total: cart.TotalPrice, Time: time, Date: date, ShopId, UserId, ShopName, ShopAddress }

      console.log(OrderData);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      }
      
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
        method: 'POST',
        headers,
        body: JSON.stringify(OrderData),
      });

      const result = await res.json();
      console.log(result);
      // setShops(result);
      if (res.status === 409) {
        return alert('Slot not available!\nSelect Another!!');
      }
      else if (res.status === 201) {
        alert('Booking Done!!');
        localStorage.removeItem('cartItems');
        navigate('/');
      }
      else 
        alert('Booking Failed!!');

    }
  }

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_CLEAR_ITEMS });
    }
  }, [success, dispatch])
  return (
    <div >
      {
        cartItems.length === 0 ? <h2 className='text-center'>Empty Cart!!</h2> : (
          <>
            <h2 className='text-center'>Your Cart</h2>
            {loading && <Loader />}
            <table className='table'>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Style</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, id) =>
                  <tr key={id}>
                    <th scope='row'>{id + 1}</th>
                    <td>{item.Style}</td>
                    <td>Rs {item.Price}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => removeFromCartHandler(item.Style)}>Remove</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <p>Total Amount to Pay {cart.TotalPrice}</p>
            <div className="input-group mb-3">
              <label className="input-group-text" for="inputGroupSelect01">Time</label>
              <select value={time} className="form-select" id="inputGroupSelect01" onChange={(e) => setTime(e.target.value)} required>
                <option value={false}>Select..</option>
                <option value="8:00 am - 8:30 am">8:00 am - 8:30 am</option>
                <option value="8:30 am - 9:00 am">8:30 am - 9:00 am</option>
                <option value="9:00 am - 9:30 am">8:30 am - 9:00 am</option>
                <option value="9:30 am - 10:00 am">9:30 am - 10:00 am</option>
                <option value="10:00 am - 10:30 am">10:00 am - 10:30 am</option>
                <option value="10:30 am - 11:00 am">10:30 am - 11:00 am</option>
                <option value="11:00 am - 11:30 am">11:00 am - 11:30 am</option>
                <option value="12:30 pm - 1:00 pm">12:30 pm - 1:00 pm</option>
                <option value="1:00 pm - 1:30 pm">1:00 pm - 1:30 pm</option>
                <option value="1:30 pm - 2:00 pm">1:30 pm - 2:00 pm</option>
                <option value="2:00 pm - 2:30 pm">2:00 pm - 2:30 pm</option>
                <option value="2:30 pm - 3:00 pm">2:30 pm - 3:00 pm</option>
                <option value="3:00 pm - 3:30 pm">3:00 pm - 3:30 pm</option>
                <option value="3:30 pm - 4:00 pm">3:30 pm - 4:00 pm</option>
                <option value="4:00 pm - 4:30 pm">4:00 pm - 4:30 pm</option>
                <option value="4:30 pm - 5:00 pm">4:30 pm - 5:00 pm</option>
                <option value="5:00 pm - 5:30 pm">5:00 pm - 5:30 pm</option>
                <option value="5:30 pm - 6:00 pm">5:30 pm - 6:00 pm</option>
                <option value="6:00 pm - 6:30 pm">6:00 pm - 6:30 pm</option>
                <option value="6:30 pm - 7:00 pm">6:30 pm - 7:00 pm</option>
                <option value="7:00 pm - 7:30 pm">7:00 pm - 7:30 pm</option>
                <option value="7:30 pm - 8:00 pm">7:30 pm - 8:00 pm</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="inputGroupSelect01">Date</label>
              <input value={date} className='form-control w-50 mx-auto' type='date' onChange={(e) => setDate(e.target.value)} required />
            </div>
            <button type="button" className="btn btn-warning" onClick={ handleBooking }>Book Now</button>
          </>
        )
      }
    </div>
  );
}

export default CartItems;
