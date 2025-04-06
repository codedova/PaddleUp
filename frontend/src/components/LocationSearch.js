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
    <div className="container mt-4">
      <h2>Search for Pickleball Courts</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary mt-2">Search</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {locations.length > 0 && (
        <ul className="list-group">
          {locations.map(loc => (
            <li key={loc.place_id} className="list-group-item">
              <strong>{loc.name}</strong> - {loc.address} (Rating: {loc.rating || 'N/A'})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
