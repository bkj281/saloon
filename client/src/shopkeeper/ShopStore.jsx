import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import add from '../assets/add.gif';


const ShopStore = ({ shops }) => {

  const addwala = <Col xs={12} md={4} className='mt-5 pt-md-5'>
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

  return (
    <>
      {shops.length === 0 ? addwala :
        <Container>
        <Row>
        {shops.map((shop) => (
          <div key={shop._id} className="col-md-4 col-sm-1 mt-5">
            <div className="card mb-3 mx-auto" style={{ width: '15rem', margin: "0rem auto" }}>
              <img
                src={shop.shopImage}
                className="card-img-top"
                alt="Logo"
                style={{ height: '15rem' }}
              />
              <div className="card-body">
                <h5 className="card-title">{shop.ShopName}</h5>
                <p className="card-text">{shop.openTiming} - {shop.closeTiming}</p>
                <p className="card-text">{shop.shopAddress},{' '}{shop.shopPincode}</p>
                <Link to={`/shop/${shop._id}/edit`} className="btn btn-warning">
                  Add Services
                </Link>
              </div>
            </div>
          </div>
        ))}
          {addwala}
        </Row>
        </Container>
      }
    </>
  );
}

export default ShopStore;