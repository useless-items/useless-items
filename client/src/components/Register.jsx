import { useState } from "react";
import '../index.css';

const Register = () => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({status: false, message: ''});
    const [success, setSuccess] = useState({status: false, message: ''});

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!firstName || !lastName || !username || !email || !password) {
            setError({ status: true, message: 'Please fill out all fields, you goofball.' });
            setSuccess({ status: false, message: ''});
            return;    
        }

        setError({ status: false, message: '' });

        if(firstName && lastName && username && email && password) {
            setSuccess({ status: true, message: 'Success! You are Registered!'});
            return;
        }

        setSuccess({ status: false, message: '' });

        // FOR TESTING ONLY, DELETE IN FINAL PRODUCTION
        const formData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        };

        console.log(formData);
    };
 
    return (
        <>

            <div className='register-form'>
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
            
        </>
    )
}

export default Register;