import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EventList from './components/EventList';
import CreateEvent from './components/CreateEvent';
import LocationSearch from './components/LocationSearch';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav>
          <Link to="/">Events</Link> |{' '}
          {user ? (
            <>
              <Link to="/create">Create Event</Link> | <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          )}
          {' | '}
          <Link to="/locations">Location Search</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={user ? <CreateEvent /> : <p>Please log in to create an event.</p>} />
          <Route path="/locations" element={<LocationSearch />} />
          <Route path="/" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
