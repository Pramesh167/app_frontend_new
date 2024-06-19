import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  var validate = () => {
    var isValid = true;

    // validate the email

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data).then((res) => {
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        // success-bool, message-string, user-object, token-string
        localStorage.setItem('token', res.data.token);

        const convertedUserData = JSON.stringify(res.data.user);
        localStorage.setItem('user', convertedUserData);

        // set authorization header

        // window.location.href = '/admin/dashboard';
      }
    });
  };

  return (
    <div className='container'>
      <div className='form-container '>
        <h2 className='text-center mb-4'>Log in</h2>
        <form className='m-auto'>
          <div className='form-group mb-5'>
            <label htmlFor='email'>Email Address : {email}</label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className='text-danger'>{emailError}</p>}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: {password}</label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className='text-danger'>{passwordError}</p>}

            <div className='d-flex justify-content-center'>
              <button
                type='submit'
                className='btn btn-danger btn-block w-50 mt-5'
                onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
