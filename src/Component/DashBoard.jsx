import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Token from '../Context/Token';
import { useNavigate } from 'react-router-dom';
const DashBoard = () => {
  const { token ,setToken} = useContext(Token);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigate=useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      setToken(storedToken);
    } else if (!token && !storedToken) {
      // If there is no token, redirect to the login page
      navigate('/login');
    }
  }, [token, setToken, navigate]);





  useEffect(() => {
    if (token) {
      axios
        .get('https://instagram-express-app.vercel.app/api/auth/zuku', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.data.user.name);
          setMessage(res.data.data.message);
          setEmail(res.data.data.user.email);
        })
        .catch((error) => { console.error('Error fetching user data:', error)
                            //  setUser('')
                            //  setEmail('')
                            //  setMessage('')
    });
    }
  }, [token]);


const exitDashBoard=  async()=>{
  
    try {
        await axios.delete('https://instagram-express-app.vercel.app/api/auth/logout', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem('token');
        setToken(null);
            setUser('')
            setEmail('')
             setMessage('')
        
        console.log('Logout successfully');
        navigate('/login');
      } catch (e) {
        navigate('/login');
        console.log(e.message);
      }
}
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, {user}</h1>
      <p style={styles.message}>Message from Mark Zuckerberg: {message}</p>
      <p style={styles.email}>Email: {email}</p>
             thank you 
             <div>
                <button style={styles.logoutButton} onClick={exitDashBoard}>Logout</button>
             </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '15px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '10px',
  },
  email: {
    fontSize: '16px',
    color: '#777',
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    color: '#FFF',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default DashBoard;
