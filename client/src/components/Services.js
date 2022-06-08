import React from 'react';
import { Button } from 'react-bootstrap';

function Services({ shopName, handleServiceClick, services, active }) {

  return (
    <>
      <div className='d-none d-md-block'>
        <h1>{shopName}</h1>
        {
          services && services.map((service, id) =>
            service !== '_id' && service !== '__v' && <h4 key={id} onClick={() => handleServiceClick(service)} style={active === service ? { 'cursor': 'pointer', color: 'red' } : { 'cursor': 'pointer' }}>{service}</h4>
          )
        }
      </div>
      <div className='d-md-none'>
        <Button variant="dark" className='btn-sm' data-bs-toggle="offcanvas" data-bs-target="#services">
          {shopName}
        </Button>
        <div className="offcanvas offcanvas-start" tabindex="-1" id="services">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Services</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            {
              services && services.map((service, id) =>
                service !== '_id' && service !== '__v' && <h4 key={id} onClick={() => handleServiceClick(service)} style={active === service ? { 'cursor': 'pointer', color: 'red' } : { 'cursor': 'pointer' }}>{service}</h4>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
