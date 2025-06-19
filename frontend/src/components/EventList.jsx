import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal';
import './EventList.css'; // 🔥 custom styling for this component

const EventList = ({ filter, search }) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const isAuthenticated = !!localStorage.getItem('access_token');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events/', {
          params: { filter_type: filter, search },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [filter, search]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('You must be logged in to delete events');
        return;
      }
      await axios.delete(`http://localhost:8000/api/events/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Ensure you are logged in as an admin.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-white fade-in">✨ Event Listings</h2>
      <div className="row g-4">
        {events.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4 fade-in-up">
            <div className="glass-card h-100 p-4 shadow-lg rounded-4 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold text-white mb-3">{event.name}</h5>
                <p className="mb-1 text-light"><strong>Date:</strong> {event.date}</p>
                <p className="mb-1 text-light"><strong>Time:</strong> {event.time}</p>
                <p className="mb-1 text-light"><strong>Location:</strong> {event.location}</p>
                <p className="text-light">{event.description}</p>
                {event.due_date && (
                  <p className="mb-1 text-light"><strong>Due Date:</strong> {event.due_date}</p>
                )}
                <p className="mb-0 text-light"><strong>Reminder:</strong> {event.reminder ? 'Yes' : 'No'}</p>
              </div>
              {isAuthenticated && (
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-outline-light scale-hover rounded-pill px-4"
                    onClick={() => window.location.href = `/edit/${event.id}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger scale-hover rounded-pill px-4"
                    onClick={() => {
                      setEventToDelete(event.id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <DeleteModal
          onConfirm={() => handleDelete(eventToDelete)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EventList;
