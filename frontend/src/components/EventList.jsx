import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal';

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
      <h2 className="mb-4 text-primary fw-bold text-center">Event Listings</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100 border-0 rounded-4">
              <div className="card-body">
                <h5 className="card-title fw-semibold">{event.name}</h5>
                <p className="card-text text-muted"><strong>Date:</strong> {event.date}</p>
                <p className="card-text text-muted"><strong>Time:</strong> {event.time}</p>
                <p className="card-text text-muted"><strong>Location:</strong> {event.location}</p>
                <p className="card-text">{event.description}</p>
                {event.due_date && (
                  <p className="card-text text-muted">
                    <strong>Due Date:</strong> {event.due_date}
                  </p>
                )}
                <p className="card-text text-muted">
                  <strong>Reminder:</strong> {event.reminder ? 'Yes' : 'No'}
                </p>
              </div>
              {isAuthenticated && (
                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary rounded-pill px-3"
                    onClick={() => window.location.href = `/edit/${event.id}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger rounded-pill px-3"
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
