/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUserApi } from "../../api/api";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  var validate = () => {
    var isValid = true;

    // validate the first name
    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      isValid = false;
    }
    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("EMail is required");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate
    var isValidated = validate();
    if (!isValidated) {
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password doesn't match");
      return;
    }

    // Making json data
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    // Sending request to the api
    registerUserApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className="container">
      <div className="form-container ">
        <h2 className="text-center mb-4">Register</h2>
        <form className="m-auto">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={handleFirstName}
              required
            />
            {firstNameError && <p className="text-danger">{firstNameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={handleLastName}
              required
            />
            {lastNameError && <p className="text-danger">{lastNameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleEmail}
              required
            />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handlePassword}
              required
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleConfirmPassword}
              required
            />
            {confirmPasswordError && (
              <p className="text-danger">{confirmPasswordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-danger btn-block w-50"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
