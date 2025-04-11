import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage("Invalid user name or pw");
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* error message */}
        {errorMessage && (
          <div style={styles.errorMessage}>
            <p style={styles.errorText}>{errorMessage}</p>
          </div>
        )}

        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

// Define styles object
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: '#333'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box' as const
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    border: '1px solid #ffcdd2',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '15px'
  },
  errorText: {
    color: '#c62828',
    margin: 0,
    textAlign: 'center' as const
  }
};

export default Login;
