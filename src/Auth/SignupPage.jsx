import React ,{useState,useContext}from 'react';
import axios from 'axios';
import '../app.css'; 
import Token from '../Context/Token';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
const SignupPage = () => {

  const [form,setForm]=useState({name:'', email:'',password:'' ,confirmpassword:''})

  const[errmsg,setErrormsg]=useState('')
  const[sucessmsg,setSucessmsg]=useState('')
   
  const{name,email,password,confirmpassword}=form

  const navigate=useNavigate()
  // use Context


  const {token,setToken}=useContext(Token);
  console.log("Token ",token);

  const handleSubmit =  (e) => {
      e.preventDefault()
    //   console.log(form);

    // validation 
       if(!name ||!email || !password || !confirmpassword){
        // alert('please fill all  the input fields ')
        setErrormsg('please fill all  the input fields')
        setSucessmsg('')
        return;
       }
       else if(password!==confirmpassword){
        setErrormsg("Passwords do not match. Please ensure both fields have the same password.")
        setSucessmsg('')
        return
       }

       // API 
       axios.post(`https://instagram-express-app.vercel.app/api/auth/signup`,{
        name,email,password
       })
       .then((response)=>{
              setSucessmsg(response.data.message)
              setToken(response.data.data.token)
              setErrormsg('')
              setTimeout(()=>{
                navigate('/login')
              },1000)
             
       })
       .catch(e=>{ 
        setErrormsg(e.response.data.message);
       setSucessmsg('')
       })

        

  
  };

  return (
    <div className="signup-container">
      <h3>Signup</h3>

      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" placeholder="Enter your name" value={name}
         onChange={e=>setForm({...form,name:e.target.value})}    
        />
        <input type="email" placeholder="Enter your email" value={email}
          onChange={e=>setForm({...form,email:e.target.value})}   
         />
        <input type="password" placeholder="Password" value={password}
          onChange={e=>setForm({...form,password:e.target.value})}   
         />
        <input type="password" placeholder="Confirm password" value={confirmpassword}
           onChange={e=>setForm({...form,confirmpassword:e.target.value})}   
        
        />
        {errmsg && <p style={{color:'red'}}> {errmsg}</p>}
        {
          sucessmsg && <p style={{color:'green'}}>{sucessmsg}</p>
        }

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupPage;
