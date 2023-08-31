import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setToken, setUserId}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({status: false, message: ''});
    const [success, setSuccess] = useState({status: false, message: ''});

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!username || !password) {
            setError({ status: true, message: 'Please fill out all fields, you goofball!'});
            setSuccess( {status: false, message: ''});
            return;
        }

        setError({ status: false, message: ''});

        try {
            //This is a temporary fetch login, please change as backend is fleshed out.
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            setToken(data.token)
            if(response.ok) {
                navigate('/userportal');
                setUserId(data.userId);

                setSuccess({ status: true, message: 'Login successful' });
            } else {
                setError({ status: true, message: 'Invalid credentials' });
            }
        } catch (error) {
            console.log(error);
            setError({ status: true, message: 'An error occured' });
        }

    };

    return (
        <>
            <div id='login-page'>
                <div>
                    <h1>Login Page</h1>
                </div>

                {error.status && <h2 className='error-message'>{error.message}</h2>}
                {success.status && <h2 className='success-message'>{success.message}</h2>}

                <form onSubmit={handleLogin}>
                    <div className='login-category'>
                        <label>Username: </label>
                        <input type="text" id="namebox" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='login-category'>
                        <label>Password: </label>
                        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* Add Login Button to Submit at Bottom */}
                    <div className='login-submit-container'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>

        </>
    )
};

export default Login;
