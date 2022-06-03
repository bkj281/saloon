import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Col, Container, Image, ListGroup, Row } from 'react-bootstrap';


const MyInfo = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [role] = useState(JSON.parse(localStorage.getItem('userInfo')).user.Role);
  const [shop, setShop] = useState({});


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

      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/info/${params.id}`, {
        method: 'POST',
        headers
      });

      const result = await res.json();
      // console.log(result.user);
      setUser(result.user);

      if (role === "shopkeeper") {
        const res2 = await fetch(`${process.env.REACT_APP_API_URL}/saloons/info/${params.id}`, {
          method: 'POST',
          headers
        });

        const result2 = await res2.json();
        setShop(result2.user);  
        // console.log(result2.user);
      }

      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  const load = () => {
    loadData();
  }

  useEffect(() => {
    load();
  }, []);

  const ary = shop.ServiceId? Object.keys(shop.ServiceId).map((obj) => 
    <ListGroup.Item>
      {`${obj} : ${shop.ServiceId[obj].length !== 0?shop.ServiceId[obj].map((i) => i.Style): `No Style Available`}`}
    </ListGroup.Item>
  ):null;

  return (
    <>
      <h1 className='mx-5 mt-3 text-decoration-underline'>My Info</h1>
      {loading ? <Loader /> :
        <>
          <Container className='mt-3'>
            <Row>
              <Col xs={6} md={3}>
                <h2>Name :</h2>
              </Col>
              <Col xs={6} md={3}>
                <h4>{user.name}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <h2>Email :</h2>
              </Col>
              <Col xs={6} md={6}>
                <h4>{user.email}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <h2>Phone No. :</h2>
              </Col>
              <Col xs={6} md={3}>
                <h4>{user.phoneNo}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <h2>Address :</h2>
              </Col>
              <Col xs={6} md={6}>
                <h4>{`${user.City}, ${user.State}, ${user.Pincode}`}</h4>
              </Col>
            </Row>
          </Container>
        {role === "shopkeeper"?
          <Container>
            <hr />
            <Row>
              <Col xs={6} md={3}>
                <h2>Shop Name :</h2>
              </Col>
              <Col xs={6} md={3}>
                <h4>{shop.ShopName}</h4>
              </Col>
              <Col xs={0} md={6}>
                <Image src={shop.shopImage} alt="Logo" roundedCircle style={{ height:"auto", width:"3rem" }} />
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <h2>Timing :</h2>
              </Col>
              <Col xs={6} md={9}>
                <h4>{`${shop.openTiming} - ${shop.closeTiming}`}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <h2>Address :</h2>
              </Col>
              <Col xs={6} md={9}>
                <h4>{`${shop.shopAddress}, ${shop.shopPincode}.`}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <h2>Services :</h2>
              </Col>
              <Col xs={6} md={5}>
                <ListGroup variant="flush">
                  {ary}
                </ListGroup>
              </Col>
            </Row>
          </Container>:null}
        </>
      }
    </>
  );
}

export default MyInfo;