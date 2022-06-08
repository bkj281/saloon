import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
const ShopEdit = () => {
    const params = useParams();
    
    const navigate = useNavigate();
	const [HairCutting, setHairCutting] = useState([]);
    const [Shaving, setShaving] = useState([]);
	const [HairColor, setHairColor] = useState([]);
	const [Facial, setFacial] = useState([]);
	const [FaceWash, setFaceWash] = useState([]);
	const [Bleach, setBleach] = useState([]);
	const [Massage, setMassage] = useState([]);
	const [style, setStyle] = useState("");
	const [price, setPrice] = useState("");
    const [option, setOption] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async() => {
          const config = {
            headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            }
          }
          const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/saloons/shop/${params._id}`,{});
          console.log(data);
          
        }
        loadData();
    }, []);
    const submitHandler = async(e) => {
        e.preventDefault();   
        let obj = {
            Style:style,
            Price:price,
        }     
        switch (option) {
            case "HairCutting":
                HairCutting.push(obj);
                break;
            case "Shaving":
                Shaving.push(obj);
                break;
            case "HairColor":
                HairColor.push(obj);
                break;
            case "Facial":
                Facial.push(obj);
                break;
            case "FaceWash":
                FaceWash.push(obj);
                break;
            case "Bleach":
                Bleach.push(obj);
                break;
            case "Massage":
                Massage.push(obj);
                break;
            default:
                break;
        }
        let ServiceId = {
            HairCutting: HairCutting,
            Shaving: Shaving,
            HairColor: HairColor,
            Facial: Facial,
            FaceWash: FaceWash,
            Bleach: Bleach,
            Massage: Massage,
        };

        const config = {
            headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
            }
        }
        setLoading(true);
    
        const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/saloons/shop/${params._id}/edit`,ServiceId,config);
        console.log(data);
    } 
    return (
        <div className="container">
			<div className="row m-3 no-gutters shadow align-content-center w-75 mx-auto">

				<div className="col-md-6 m-auto p-5">
					<h3 className="pb-3">Edit Form</h3>
					<div className="form-style">
						<form onSubmit={submitHandler}>
							<div className="form-group mt-2">
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Select Service</label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={e=> setOption(e.target.value)}>
                                        <option value="HairCutting">HairCutting</option>
                                        <option value="Shaving">Shaving</option>
                                        <option value= "HairColor">HairColor</option>
                                        <option value="Facial">Facial</option>
                                        <option value="FaceWash">FaceWash</option>
                                        <option value="Bleach">Bleach</option>
                                        <option value="Massage">Massage</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Style</label>
                                    <input type="name" class="form-control" id="exampleFormControlInput1" onChange={e=>setStyle(e.target.value)} placeholder="Style Name" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Price</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1" onChange={e=>setPrice(e.target.value)} placeholder="Style Price" />
                                </div>
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

export default ShopEdit