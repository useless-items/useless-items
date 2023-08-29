import { useState } from "react";

const Register = ({setToken}) => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({status: false, message: ''});
    const [success, setSuccess] = useState({status: false, message: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !username || !email || !password) {
            setError({ status: true, message: 'Please fill out all fields, you goofball.' });
            setSuccess({ status: false, message: ''});
            return;    
        }

        setError({ status: false, message: '' });

        try {
            //This is a temporary fetch login, please change as backend is fleshed out.
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ firstName, lastName, username, email, password }),
            });
            
            const data = await response.json();
            if (data.token) {
                setToken(data.token)
                setSuccess({ status: true, message: 'Success! You are Registered!'});
            }else {
                setError({ status: true, message: 'Invalid credentials' });
            }
        } catch (error) {
            console.log(error);
            setError({ status: true, message: 'An error occured' });
        }

        setSuccess({ status: false, message: '' });


    };
 
    return (
        <div id="register">
            <div>
                <h1>User Registration</h1>
            </div>
            
            {error.status && <h2 className='error-message'>{error.message}</h2>}
            {success.status && <h2 className='success-message'>{success.message}</h2>}

            <form onSubmit={handleSubmit}>
                <div className='register-category'>
                    <label>First Name: </label>
                    <input type="text" name="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='register-category'>
                    <label>Last Name: </label>
                    <input type="text" name="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='register-category'>
                    <label>Username: </label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='register-category'>
                    <label>Email: </label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='register-category'>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='register-submit-container'>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
