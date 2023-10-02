import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
    // login form useState
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null);

    // Router
    // const navigate = useNavigate();

    // context
    const {loginUser} = useContext(AuthContext);

    const {username, password} = loginForm

    // login form onChange handler
    const onChangeLoginForm = event => {
        setLoginForm({
            ...loginForm, 
            [event.target.name]: event.target.value
        });
    }

    // login form submit handler
    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);

            if(loginData.status === 200) {
                // navigate('/dashboard');
            } else {
                setAlert({type: 'danger', message: loginData.data.message})
                setTimeout(() => {
                    setAlert(null);
                }, 5000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={login}>
            <AlertMessage info={alert} />
                <Form.Group className='pb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button 
                    variant='success' 
                    type='submit'
                >Login</Button>
            </Form>

            <p>
                <span>Don't have a account</span>
                <Link to='/register'>
                    <Button style={{marginLeft: '12px'}}>Register</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm;