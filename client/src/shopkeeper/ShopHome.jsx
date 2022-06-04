import React, { useEffect, useState } from 'react';
import HomeCaraousel from '../components/HomeCaraousel';
import Loader from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import ShopStore from './ShopStore';

const ShopHome = () => {

  const navigate = useNavigate();
  const params = useParams();

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const loadData = async () => {
    try {
      setLoading(true);
      if (localStorage.getItem("userInfo") === null || localStorage.getItem('user') === null) {
        alert('Login First');
        return navigate('/login');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      }
      
      const res = await fetch(`${process.env.REACT_APP_API_URL}/saloons/myshops/${params._id}`, {
        method: 'POST',
        headers
      });

      const result = await res.json();
      console.log(result);
      setShops(result);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <HomeCaraousel />
      
      {loading? <Loader />:<ShopStore shops={shops} />}
    </>
  );
}

export default ShopHome;