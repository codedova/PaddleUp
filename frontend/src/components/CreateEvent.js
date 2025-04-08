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
    
    // Log the payload for debugging:
    const payload = { title, description, event_date: eventDate, location };
    console.log("Payload to send:", payload);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/events', payload, 
        { withCredentials: true }
      );
      console.log("Create event response:", response.data);
      setMessage(response.data.message || "Event created successfully");
      setTitle('');
      setDescription('');
      setEventDate('');
      setLocation('');
    } catch (err) {
      console.error("Error during event creation:", err);
      console.error("Error details:", err);
      setMessage(err.response?.data?.error || 'Event creation failed.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/create-bg.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255,255,255,0.85)', padding: 4, borderRadius: 2 }}>
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
            label="Event Date (MM-DD-YYYY HH:MM)"
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
      </Container>
    </Box>
  );
};

export default CreateEvent;
