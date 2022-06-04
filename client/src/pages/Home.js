import React, { useEffect } from 'react';
import HomeCaraousel from '../components/HomeCaraousel';
import AllStore from '../components/AllStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('userInfo'))
            if (JSON.parse(localStorage.getItem('userInfo')).user.Role === 'shopkeeper')
                navigate(`/shopkeeper/${localStorage.getItem('user')}`)
    }, []);

    return (
        <div>
            <HomeCaraousel />
            <AllStore  />
        </div>
    );
};

export default Home;
