import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Componant/Header';
import Home from './Componant/home';
import CreateTourForm from './Componant/createAdit';
import { useEffect, useState } from 'react';
import LoginSignup from './Componant/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [user, setUser] = useState(null); // State to hold user data (null means not logged in)
  const navigate = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    // This useEffect runs when the 'user' state changes
    if (user === null) {
      // If the user is null, navigate to the login page
      navigate('/login');
    }
  }, [user]); // The effect depends on the 'user' state

  return (
    <div className="App">
      <ToastContainer /> {/* This component displays toast notifications */}

      {/* Conditionally render Navbar only if the user is logged in */}
      {user == null ? <></> : <Navbar user={user} setUser={setUser} />}

      {/* Define the routes for the application */}
      <Routes>
        {/* Home route: Display all tours */}
        <Route path='/' element={<Home user={user} />} />
        {/* Route for searching specific tours based on title */}
        <Route path='/getuser/:title' element={<Home user={user} />} />
        {/* Login route: Display the login/signup form */}
        <Route path='/login' element={<LoginSignup setUser={setUser} />} />
        {/* Create new tour route */}
        <Route path='/create' element={<CreateTourForm user={user} />} />
        {/* Route for updating an existing tour */}
        <Route path='/update/:id' element={<CreateTourForm user={user} />} />
        {/* Catch-all route for unmatched paths */}
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
