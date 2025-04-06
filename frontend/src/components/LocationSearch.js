// src/components/LocationSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Alert, List, ListItem, ListItemText, Box } from '@mui/material';

const LocationSearch = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/locations?q=${encodeURIComponent(query)}`);
      setLocations(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching locations.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search for Pickleball Courts
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
          <TextField
            label="Search Query"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Search
          </Button>
        </Box>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {locations.length > 0 && (
          <List sx={{ mt: 2 }}>
            {locations.map((loc) => (
              <ListItem key={loc.place_id}>
                <ListItemText
                  primary={loc.name}
                  secondary={`${loc.address} (Rating: ${loc.rating || 'N/A'})`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default LocationSearch;
