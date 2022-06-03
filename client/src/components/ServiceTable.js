import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartAction';

function ServiceTable({services, serviceType}) {
  
  const dispatch = useDispatch();
  
  const addToCartHandler = (item) =>{
    dispatch(addToCart(item));
  }

  let arr = [];
  // console.log(services);
  arr = services.length !== 0 ? services[serviceType]: [];
  
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Style</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {arr.length === 0?<tr><td>No Services Available</td></tr>:arr.map((item, id)=>
            <tr key={id}>
              <th scope='row'>{id + 1}</th>
              <td>{item.Style}</td>
              <td>Rs {item.Price}</td>
              <td>
                <button className="btn btn-warning" onClick={()=>addToCartHandler(item)}>Add</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
