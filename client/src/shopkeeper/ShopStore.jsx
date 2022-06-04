import React from 'react';
import { Link } from 'react-router-dom';


const ShopStore = ({ shops }) => {

  // console.log(shops.length);

  return (
    <>
      {shops.length === 0 ? <div>No Shops Availabe</div> :
        shops.map((shop) => (
          <div key={shop._id} className="col-md-4 col-sm-1 mt-5">
            <div className="card mb-3 mx-auto" style={{ width: '15rem', margin: "0rem auto" }}>
              <img
                src={shop.shopImage}
                className="card-img-top"
                alt="Logo"
              />
              <div className="card-body">
                <h5 className="card-title">{shop.ShopName}</h5>
                <p className="card-text">{shop.openTiming} - {shop.closeTiming}</p>
                <p className="card-text">{shop.shopAddress},{' '}{shop.shopPincode}</p>
                {/* <Link to={`shop/${shop._id}`} className="btn btn-warning">
                  Edit
                </Link> */}
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
}

export default ShopStore;