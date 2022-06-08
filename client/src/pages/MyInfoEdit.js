import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
const MyInfoEdit = () => {
    const params = useParams();
    
    const navigate = useNavigate();
	  const [name, setName] = useState("");
	  const [email, setEmail] = useState("");
	  const [city, setCity] = useState("");
	  const [cityState, setCityState] = useState("");
	  const [PinCode, setPinCode] = useState("");
	  const [phoneNo, setPhoneNo] = useState("");
    // const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    // const [role] = useState(JSON.parse(localStorage.getItem('userInfo')).user.Role);
    // const loadData = async () => {
    //     try {
    //       if (localStorage.getItem('user') === null) {
    //         alert('Login First');
    //         return navigate('/login');
    //       }
    
    //       const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
    //       }
    
    //       setLoading(true);
    
    //       const res = await fetch(`${process.env.REACT_APP_API_URL}/user/info/${params.id}`, {
    //         method: 'POST',
    //         headers
    //       });
    
    //       const result = await res.json();
    //       // console.log(result.user);
    //       setUser(result.user);
    
    //       setLoading(false);
    
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    
    //   const load = () => {
    //     loadData();
    //   }
      useEffect(() => {
        const loadData = async() => {
          const config = {
            headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            }
          }
          const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/user/info/${params.id}`,{},config);
          console.log(data.user);
          setName(data.user.name);
          setEmail(data.user.email);
          setCity(data.user.City);
          setCityState(data.user.State);
          setPinCode(data.user.Pincode);
          setPhoneNo(data.user.phoneNo);
        }
        loadData();
      }, []);
    
    
    const submitHandler = async(e) => {
        e.preventDefault();
        // user.name = name;
        // user.email = email;
        // user.City = city;
        // user.State = cityState;
        // user.Pincode = PinCode;
        // user.phoneNo = phoneNo;
        const user = {name:name,email:email,City:city,State:cityState,Pincode:PinCode,phoneNo:phoneNo};
        const config = {
            headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            }
        }
        setLoading(true);
    
          const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/user/info/${params.id}`,user,config);
          setName(data.user.name);
          setEmail(data.user.email);
          setCity(data.user.City);
          setCityState(data.user.State);
          setPinCode(data.user.Pincode);
          setPhoneNo(data.user.phoneNo);
          
          console.log("Updated",data);
          
          setLoading(false);
    
    }
    return (
        <div className="container">
			<div className="row m-3 no-gutters shadow align-content-center w-75 mx-auto">

				<div className="col-md-6 m-auto p-5">
					<h3 className="pb-3">Edit Form</h3>
					<div className="form-style">
						<form onSubmit={submitHandler}>
							<div className="form-group mt-2">
								<input type="text" placeholder="Name" name='name' value={name} onChange={e=>setName(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
							</div>
							<div className="form-group mt-2">
								<input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="text" placeholder="State" value={cityState} onChange={e => setCityState(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="number" min={100000} placeholder="Pin Code" value={PinCode} onChange={e => setPinCode(e.target.value)} className="form-control" required />
							</div>
							<div className="form-group mt-2">
								<input type="number" min={6000000000} placeholder="Phone Number" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} className="form-control" required />
							</div>

							<div className="pb-2">
								<button type="submit" className="btn btn-warning w-100 font-weight-bold mt-2">Update</button>
							</div>
						</form>
					</div>
				</div>
				
			</div>
		</div>
    )
}

export default MyInfoEdit