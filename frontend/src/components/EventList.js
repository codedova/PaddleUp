import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul className="list-group">
          {events.map(event => (
            <li key={event.id} className="list-group-item">
              <strong>{event.title}</strong> on {event.event_date} at {event.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
