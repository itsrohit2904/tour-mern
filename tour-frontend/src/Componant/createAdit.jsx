import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTourForm = ({ user }) => {
  // State to store the form data
  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    pick_up: '',
    meeting_point: '',
    drop_off: '',
    duration: '',
    duration_unit: 'days', // Default to "days"
  });

  // State to handle loading indicator
  const [loading, setLoading] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Get the 'id' from URL parameters (for updating a tour)
  const { id } = useParams();

  // useEffect hook to fetch tour details if 'id' is present (i.e., updating tour)
  useEffect(() => {
    const getdetail = async () => {
      setLoading(true); // Set loading to true while fetching
      const res = await axios.get(`https://tour-backend-kuvb.onrender.com/tours/${user.id}/update/${id}`);
      setLoading(false); // Set loading to false once data is fetched
      setTourData(res.data[0]); // Set fetched data to form state

      console.log(res.data); // Log the response data (for debugging)
    };

    // If no user is logged in, navigate to login page
    if (user === null) {
      navigate('/login');
    }
    
    // If 'id' is present, fetch the tour details for editing
    if (id) {
      getdetail();
    }

  }, []); // Empty dependency array ensures this effect runs once on component mount

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  // Handle form submission (create or update tour)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form's default behavior
    if (!id) {
      // If no 'id', it's a create request
      try {
        setLoading(true); // Set loading true while creating tour
        const res = await axios.post("https://tour-backend-kuvb.onrender.com/tours", {
          Uid: user.id, // Include logged-in user id
          ...tourData, // Spread the form data
        });
        setLoading(false); // Set loading false after request is done
        toast.success(res.data.message); // Show success message
        navigate('/'); // Redirect to homepage after successful creation
      } catch (error) {
        setLoading(false); // Set loading false in case of error
        toast.error(error.response.data.message); // Show error message
      }
    } else {
      // If 'id' exists, it's an update request
      try {
        setLoading(true); // Set loading true while updating tour
        const res = await axios.put(`https://tour-backend-kuvb.onrender.com/tours/${id}`, {
          Uid: user.id, // Include logged-in user id
          ...tourData, // Spread the form data
        });
        setLoading(false); // Set loading false after request is done
        toast.success(res.data.message); // Show success message
        navigate('/'); // Redirect to homepage after successful update
      } catch (error) {
        setLoading(false); // Set loading false in case of error
        toast.error(error.response.data.message); // Show error message
      }
    }
  };

  return (
    // Conditional rendering based on loading state
    loading ? (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <div className="container mt-5">
        {/* Back Button to navigate to the home page */}
        <div className="mb-4">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            &larr; Back
          </button>
        </div>
        
        {/* Form Card */}
        <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="text-center">{id ? "Update Tour" : "Create Tour"}</h2>
          <form onSubmit={handleSubmit}>
            {/* Tour Title Input */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={tourData.title}
                onChange={handleChange}
                placeholder="Enter tour title"
                required
              />
            </div>
            
            {/* Tour Description Input */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={tourData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Enter tour description"
                required
              ></textarea>
            </div>
            
            {/* Pick-Up Location Input */}
            <div className="mb-3">
              <label htmlFor="pick_up" className="form-label">Pick-Up Location</label>
              <input
                type="text"
                className="form-control"
                id="pick_up"
                name="pick_up"
                value={tourData.pick_up}
                onChange={handleChange}
                placeholder="Enter pick-up location"
                required
              />
            </div>
            
            {/* Meeting Point Input */}
            <div className="mb-3">
              <label htmlFor="meeting_point" className="form-label">Meeting Point</label>
              <input
                type="text"
                className="form-control"
                id="meeting_point"
                name="meeting_point"
                value={tourData.meeting_point}
                onChange={handleChange}
                placeholder="Enter meeting point"
                required
              />
            </div>
            
            {/* Drop-Off Location Input */}
            <div className="mb-3">
              <label htmlFor="drop_off" className="form-label">Drop-Off Location</label>
              <input
                type="text"
                className="form-control"
                id="drop_off"
                name="drop_off"
                value={tourData.drop_off}
                onChange={handleChange}
                placeholder="Enter drop-off location"
                required
              />
            </div>
            
            {/* Duration Input */}
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duration</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                id="duration"
                name="duration"
                value={tourData.duration}
                onChange={handleChange}
                placeholder="Enter duration"
                required
              />
            </div>
            
            {/* Duration Unit Select */}
            <div className="mb-3">
              <label htmlFor="duration_unit" className="form-label">Duration Unit</label>
              <select
                className="form-select"
                id="duration_unit"
                name="duration_unit"
                value={tourData.duration_unit}
                onChange={handleChange}
                required
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">{id ? "Update" : "Create"}</button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateTourForm;

