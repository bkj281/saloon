import React, { useEffect, useState } from 'react';
import HomeCaraousel from '../components/HomeCaraousel';
import Loader from '../components/Loader';
import add from '../assets/add.gif';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ShopStore from './ShopStore';
import { Card, Col, Container, Row } from 'react-bootstrap';

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

      {loading ? <Loader /> : Array.isArray(shops) ? <ShopStore shops={shops} /> :
        <Container>
          <Row>
            <Col xs={12} md={4} className='mt-5 pt-md-5'>
              <Card className='mb-3' style={{ width: '15rem', margin: "0rem auto" }}>
                <Card.Header>Add Branch</Card.Header>
                <Card.Body>
                  <Link to={`/registerSaloon`}>
                    <Card.Img
                      src={add}
                      alt='Add Symbol'
                    />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      }
    </>
  );
}

export default ShopHome;