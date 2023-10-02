import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../layout/AlertMessage'
import { useContext, useState } from 'react'

const RegisterForm = () => {
    // useState
    const [registerForm, setRegisterForm] = useState({
        username: 'minhnhat123',
        password: 'minhnhat123',
        email: '123@gmail.com',
    })

    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();

    // context
    const {registerUser} = useContext(AuthContext);

    const { username, email, password } = registerForm;

    // on change register form
    const onChangeRegisterForm = (event) => {
        setRegisterForm({
            ...registerForm, 
            [event.target.name]: event.target.value,
        })
    }

    // register form submit
    const register = async (event) => {
        event.preventDefault();

        try {
            const registerData = await registerUser(registerForm);

            if(registerData.status === 201) {
                navigate('/login');
            } else {
                setAlert({
                    type: 'danger',
                    message: registerData.data.message
                })

                setTimeout(() => {
                    setAlert(null)
                }, 5000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={register}>
            <AlertMessage info={alert} />
                <Form.Group className='pb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        name='email'
                        required
                        value={email}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button 
                    variant='success' 
                    type='submit'
                >Register</Button>
            </Form>

            <p>
                <span>Already have a account</span>
                <Link to='/login'>
                    <Button style={{marginLeft: '12px'}}>Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm