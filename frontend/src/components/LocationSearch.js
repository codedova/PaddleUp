import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Search for Pickleball Courts</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {locations.length > 0 && (
        <ul>
          {locations.map(loc => (
            <li key={loc.place_id}>
              <strong>{loc.name}</strong> - {loc.address} (Rating: {loc.rating || 'N/A'})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
