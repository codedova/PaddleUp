// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert, Box } from '@mui/material';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !eventDate || !location) {
      setMessage("Title, Event Date, and Location are required.");
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
    } catch (err) {
      setMessage(err.response?.data?.error || 'Event creation failed.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Event
        </Typography>
        {message && <Alert severity="info">{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Event Date (YYYY-MM-DD HH:MM)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            Create Event
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateEvent;
