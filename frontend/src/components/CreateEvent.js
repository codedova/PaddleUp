import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!title || !eventDate || !location) {
      setMessage('Title, Event Date, and Location are required.');
      return;
    }
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/events',
        { title, description, event_date: eventDate, location },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setEventDate('');
      setLocation('');
    } catch (error) {
      setMessage(error.response.data.error || 'Event creation failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Event</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Date (MM-DD-YYYY HH:MM):</label>
          <input
            type="text"
            className="form-control"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
