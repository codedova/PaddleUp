import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, List, ListItem, ListItemText, Box } from '@mui/material';

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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/locations-bg.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255,255,255,0.85)', padding: 4, borderRadius: 2 }}>
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
      </Container>
    </Box>
  );
};

export default LocationSearch;
