import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(true);
  const [otp, setOtp] = useState('');
  const [otpSend, setOtpSend] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [chngPwd, setChngPwd] = useState(false);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      alert('Enter Email Id');
    }
    else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email
        }),
      });
      const result = await res.json();
      // console.log(result);
      if (res.status === 404) {
        return alert(result.msg);
      }
      else if (res.status === 500) {
        return alert(result.msg);
      }
      else if (res.status === 403) {
        return alert('Failed to send OTP!\nTry again later!!');
      }
      else if (res.status === 201) {
        setEmailCheck(false);
        setOtp('');
        setOtpSend(true);
      }
      else {
        alert('Something went wrong!\nTry again later!!');
      }
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (otp === '') {
      alert('Enter OTP');
    }
    else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          expiresIn: new Date().getTime()
        }),
      });
      const result = await res.json();
      // console.log(result);
      if (res.status === 408) {
        alert(result.msg);
        setEmailCheck(true);
        setOtpSend(false);
      }
      else if (res.status === 406) {
        alert(result.msg);
      }
      else if (res.status === 200) {
        setOtpSend(false);
        setChngPwd(true);
      }
      else {
        alert('Something went wrong!\nTry again later!!');
      }
    }
  }

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    if (pwd === '' || pwd2 === '') {
      alert('Fields can\'t be left empty!!');
    }
    else if (pwd !== pwd2) {
      alert('Passwords did\'n matched!');
    }
    else if (pwd.length < 6)
      alert('Password too short!!');
    else {
      const res = await fetch (`${process.env.REACT_APP_API_URL}/user/update-pwd`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          pwd
        }),
      });

      const result = await res.json();
      if (res.status === 201) {
        alert(result.msg);
        navigate('/login');
      }
      else {
        alert(result.msg);
        navigate('/forgot-password');
      }
    }
  }

  return (
    <>
      <div className='inner mx-auto mt-5 pt-5'>
        <h2 className='text-center'>Reset Password</h2>
      {emailCheck?
        <Form className='px-5'>
          <hr className='mx-auto' />
          <Form.Group className='mt-5'>
            <Form.Label>
              Enter Email Address
            </Form.Label>
            <Form.Control name="email" type="email" value={email} onChange={(a) => setEmail(a.target.value)} placeholder="Enter Email Address to reset" />
          </Form.Group>
          <Form.Group className="text-center mt-5">
            <Button onClick={handleSubmit} className="w-50" size="sm" variant='dark' type="submit">
              Send OTP
            </Button>
          </Form.Group>
        </Form>
      :<div></div>}
      {otpSend?
        <Form className='px-5'>
          <hr className='mx-auto' />
          <Form.Group className='mt-5'>
            <Form.Label>
              Enter OTP
            </Form.Label>
            <Form.Control name="otp" type="otp" value={otp} onChange={(a) => setOtp(a.target.value)} placeholder="Enter OTP" />
          </Form.Group>
          <Form.Group className="text-center mt-5">
            <Button onClick={handleSubmit2} className="w-50" size="sm" variant='dark' type="submit">
              Verify OTP
            </Button>
          </Form.Group>
        </Form> 
      :<div></div>}
      
      {chngPwd?
        <Form className='px-5'>
          <hr className='w-75 mx-auto' />
          <Form.Group className='mt-2 text-start'>
            <Form.Label>
              Enter New Password
            </Form.Label>
            <Form.Control name="pwd" type="password" value={pwd} onChange={(a) => setPwd(a.target.value)} placeholder="Enter New Password" />
          </Form.Group>
          <Form.Group className='mt-2'>
            <Form.Label>
              Re-Enter New Password
            </Form.Label>
            <Form.Control name="pwd2" type="password" value={pwd2} onChange={(a) => setPwd2(a.target.value)} placeholder="Re-Enter New Password" />
          </Form.Group>
          <Form.Group className="text-center mt-4">
            <Button onClick={handleSubmit3} className="w-50" size="sm" variant='dark' type="submit">
              Change Password
            </Button>
          </Form.Group>
        </Form> 
      :<div></div>}
      </div>
    </>
  );
}

export default ForgotPassword;