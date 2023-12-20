
import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../app.css';
import Token from '../Context/Token';
import { useNavigate } from 'react-router-dom';
import DashBoard from '../Component/DashBoard';

const LoginPage = () => {

  const [form, setForm] = useState({ email: '', password: '' })

  const [errmsg, setErrormsg] = useState('')
  const [sucessmsg, setSucessmsg] = useState('')

  const { email, password } = form

  // use Context
  const navigate=useNavigate()

  const { token, setToken } = useContext(Token);
  // console.log("Token login ", token);

  function handleLogin(e) {
    e.preventDefault()
    // console.log(form);

    // validation 
    if (!email || !password) {
      console.log(form);

      // alert('please fill all  the input fields ')
      setErrormsg('please fill all  the input fields')
      setSucessmsg('')
      return;
    }
    axios.post(`https://instagram-express-app.vercel.app/api/auth/login`, {
      email, password
    })
      .then((response) => {
        setSucessmsg(response.data.message)
        setToken(response.data.data.token)
        localStorage.setItem("token", response.data.data.token)
        setErrormsg('')
        setTimeout(()=>{
          console.log('dashboard page ');
          navigate('/DashBoard')
        },2000)
        
     
      })
      .catch(e => {
        setErrormsg(e.response.data.message);
        setSucessmsg('')
      })


  }
  return (
    <div className="signup-container">
      <h3>Login</h3>

      <form onSubmit={handleLogin} className="signup-form">

        <input type="email" placeholder="Enter your email" value={email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        {errmsg && <p style={{ color: 'red' }}> {errmsg}</p>}
        {
          sucessmsg && <p style={{ color: 'green' }}>{sucessmsg}</p>
        }
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage