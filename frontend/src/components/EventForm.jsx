import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './EventForm.css'; // 💅 Custom styles for this form

const EventForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    due_date: '',
    reminder: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await api.get(`events/${id}/`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching event:', error);
          setErrors({ submit: 'Failed to fetch event' });
        }
      };
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.due_date && !/^\d{4}-\d{2}-\d{2}$/.test(formData.due_date)) {
      newErrors.due_date = 'Due date must be in YYYY-MM-DD format';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedData = {
      ...formData,
      time: formData.time.includes(':') ? `${formData.time}:00` : formData.time,
      due_date: formData.due_date || null,
    };

    try {
      if (id) {
        await api.put(`events/${id}/`, formattedData);
      } else {
        await api.post('events/', formattedData);
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors({ submit: `Failed to save event: ${JSON.stringify(error.response?.data || 'Unknown error')}` });
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="form-glass p-5 rounded-4 shadow-lg">
            <h2 className="text-center text-white fw-bold mb-4">{id ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-light">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control shadow-sm rounded-3 ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Event title"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label text-light">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`form-control shadow-sm rounded-3 ${errors.date ? 'is-invalid' : ''}`}
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="time" className="form-label text-light">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`form-control shadow-sm rounded-3 ${errors.time ? 'is-invalid' : ''}`}
                  />
                  {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label text-light">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`form-control shadow-sm rounded-3 ${errors.location ? 'is-invalid' : ''}`}
                  placeholder="Event location"
                />
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label text-light">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control shadow-sm rounded-3"
                  rows="3"
                  placeholder="Write a short description"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="due_date" className="form-label text-light">Due Date (Optional)</label>
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  className={`form-control shadow-sm rounded-3 ${errors.due_date ? 'is-invalid' : ''}`}
                />
                {errors.due_date && <div className="invalid-feedback">{errors.due_date}</div>}
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="reminder"
                  name="reminder"
                  checked={formData.reminder}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="reminder" className="form-check-label text-light">Set Reminder</label>
              </div>

              {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

              <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill scale-hover mt-2">
                {id ? 'Update Event' : 'Add Event'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
