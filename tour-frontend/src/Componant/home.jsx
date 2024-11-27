import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const [tours, setTours] = useState([]); // State to store the list of tours
  const [loading, setLoading] = useState(false); // State to manage loading state
  const { title } = useParams(); // Extract 'title' from the URL params
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to fetch tour details by title if a title is provided in the URL
  const getdetail = async () => {
    setLoading(true); // Set loading state to true
    const res = await axios.get(`https://tour-backend-kuvb.onrender.com/tours/${user.id}/${title}`);
    setTours(res.data); // Set the fetched tours data
    setLoading(false); // Set loading state to false once data is fetched
    console.log(tours); // Log the fetched tours data
  };

  // useEffect to fetch tours data based on the presence of 'title' in the URL
  useEffect(() => {
    // Function to fetch all tours for the user
    const fetchdata = async () => {
      setLoading(true); // Set loading state to true
      const data = await axios.get(`https://tour-backend-kuvb.onrender.com/tours/${user.id}`);
      setTours(data.data); // Set the fetched tours data
      setLoading(false); // Set loading state to false once data is fetched
    };
    
    // Conditional fetch: If title is provided, fetch the tours related to that title
    if (title) {
      user && getdetail(); // Fetch tour details by title
    } else {
      user && fetchdata(); // Fetch all tours
    }
    
  }, [title]); // Dependency array ensures the effect runs when 'title' changes

  // Function to handle the deletion of a tour
  const handleDelete = async (id) => {
    // Confirm with the user before deletion
    if (window.confirm('Are you sure you want to delete this tour?')) {
      await axios.delete(`https://tour-backend-kuvb.onrender.com/tours/${id}`); // Delete the tour
      const data = await axios.get(`https://tour-backend-kuvb.onrender.com/tours/${user.id}`); // Fetch updated tours list
      setTours(data.data); // Update the state with the new list of tours
    }
  };

  return (
    // Display a loading spinner while data is being fetched
    loading ? (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      // Main content of the page
      <div className="container mt-5">
        {/* Back Button: Visible only when a 'title' is present in the URL */}
        <div className="mb-4">
          {title ? (
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              &larr; Back
            </button>
          ) : (
            <></>
          )}
        </div>
        
        {/* Title of the Page: Conditional rendering based on 'title' */}
        <h2 className="text-center mb-4">{title ? "Searched Tours" : "All Tours"}</h2>

        {/* Display list of tours */}
        {tours.length > 0 ? (
          <div className="row">
            {tours.map((tour) => (
              <div className="col-md-6 mb-4" key={tour.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{tour.title}</h5>
                    <p className="card-text">
                      <strong>Description:</strong> {tour.description}
                    </p>
                    <p className="card-text">
                      <strong>Pick-Up:</strong> {tour.pick_up}
                    </p>
                    <p className="card-text">
                      <strong>Meeting Point:</strong> {tour.meeting_point}
                    </p>
                    <p className="card-text">
                      <strong>Drop-Off:</strong> {tour.drop_off}
                    </p>
                    <p className="card-text">
                      <strong>Duration:</strong> {tour.duration} {tour.duration_unit}
                    </p>

                    {/* Buttons for Update and Delete */}
                    <div className="d-flex justify-content-end">
                      <Link to={`/update/${tour._id}`}>
                        <button className="btn btn-warning me-2">Update</button>
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(tour._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Message when no tours are available
          <div className="text-center">
            <p>No tours available. Create one to get started!</p>
          </div>
        )}
      </div>
    )
  );
};

export default Home;
