import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Container, Table } from 'react-bootstrap';

const MyOrders = () => {

  const navigate = useNavigate(),
        params = useParams();

  const [role] = useState(JSON.parse(localStorage.getItem('userInfo')).user.Role);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const loadData = async () => {
    try {
      if (localStorage.getItem('user') === null) {
        alert('Login First');
        return navigate('/login');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      }

      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/view-cart/${role}/${params._id}`, {
        method: 'POST',
        headers
      });

      const result = await res.json();
      
      setCart(result);
      // console.log('Koi hai', result);

      setLoading(false);

    } catch (error) {
      return console.log(error);
    }
  }
  
  const display = cart? cart.map((order, id) => (
    <tr key={id}>
      <td>{id+1}</td>
      <td>{role === "user"?order.ShopName: order.UserName}</td>
      <td>{role === "user"?order.ShopAddress: order.UserContact}</td>
      <td>{order.orders.map((i) => `${i.Style}, `)}</td>
      <td>{order.TotalPrice}</td>
      <td>{order.TimeSlot}</td>
      <td>{order.Date}</td>
    </tr>
  )): <tr><td></td><td></td><td></td><td>No Orders to show</td><td></td><td></td><td></td></tr>;

  useEffect(
    () => loadData() 
    , []);

  return (
    <>
      <h1 className='mx-5 mt-3 text-decoration-underline'>My Orders</h1>
      <Container className='mt-5'>
        <Table className='text-center' striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>{role === "user"?"Shop Name": "Customer Name"}</th>
              <th>{role === "user"?"Shop Address": "Phone No."}</th>
              <th>Orders</th>
              <th>Total Amount</th>
              <th>Time Slot</th>
              <th>Date</th>
            </tr>
          </thead>
          {loading? <Loader />:
            <tbody>
              { display }
            </tbody>
          }
        </Table>
      </Container>
    </>
  );
}

export default MyOrders;