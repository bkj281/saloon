import React from 'react';

function Services({handleServiceClick,services,active}) {

  return (
    <div >
      {
        services && services.map((service,id) =>
          service !== '_id' && service !== '__v' && <h4 key={id} onClick={()=>handleServiceClick(service)} style={active===service?{'cursor':'pointer',color:'green'} :{'cursor':'pointer'}}>{service}</h4>
        )
      }
    </div>
  );
}

export default Services;
