import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const LoginSignup = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup forms
  const [email, setEmail] = useState(); // State to store the email input
  const [password, setPassword] = useState(); // State to store the password input
  const [firstName, setFirstName] = useState(); // State to store the first name input (for signup)
  const [loading, setLoading] = useState(false); // State to manage loading state (show spinner while fetching data)
  const [lastName, setLastName] = useState(); // State to store the last name input (for signup)
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Function to handle signup process
  const handlesignup = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      if (firstName && lastName && email && password) {
        setLoading(true); // Set loading state to true during the request
        const response = await axios.post("https://tour-backend-kuvb.onrender.com/users/register", {
          username: `${firstName} ${lastName}`, // Combine first and last name to form the username
          email,
          password,
        });
        console.log(response.data); // Log the response from the backend
        setUser(response.data); // Set the logged-in user in the parent component
        setLastName(false); // Clear last name state
        toast.success("Register Successfuly"); // Show success message
        navigate('/'); // Redirect to homepage after successful signup
      } else {
        toast.error("All fields are mandatory"); // Show error message if any field is empty
      }
    } catch (error) {
      toast.error(error.response.data.message); // Show error message if signup fails
    }
  };

  // Function to handle login process
  const handlelogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const params = {
        email,
        password,
      };
      setLoading(true); // Set loading state to true during the request
      const response = await axios.get("https://tour-backend-kuvb.onrender.com/users/login", { params });
      setUser(response.data); // Set the logged-in user in the parent component
      setLoading(false); // Set loading state to false once data is received
      toast.success("Login Successfuly"); // Show success message
      navigate('/'); // Redirect to homepage after successful login
    } catch (error) {
      console.log(error); // Log the error
      toast.error(error.response.data.message); // Show error message if login fails
    }
  };

  return (
    loading ? (
      // Show a loading spinner while waiting for data
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      // Main form layout (Login/Signup)
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
          <h2 className="text-center">{isLogin ? 'Login' : 'Signup'}</h2>
          
          {/* Conditional rendering based on login/signup state */}
          {isLogin ? (
            // Login Form
            <form>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="loginEmail"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="loginPassword"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" onClick={handlelogin} className="btn btn-primary w-100">
                Login
              </button>
            </form>
          ) : (
            // Signup Form
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="signupEmail"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="signupPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" onClick={handlesignup} className="btn btn-success w-100">
                Signup
              </button>
            </form>
          )}

          {/* Button to toggle between login and signup forms */}
          <div className="text-center mt-3">
            <button type="button" className="btn btn-link" onClick={toggleForm}>
              {isLogin
                ? "Don't have an account? Signup"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginSignup;
