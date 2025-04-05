# Paddle Up

**Paddle Up** is a full-stack event scheduling platform for pickleball events in the Bay Area. This project allows users to create and view pickleball events and search for nearby pickleball courts using the Google Places API.

## Features

- **Event Scheduling API:**  
  Create and list pickleball events with details such as title, description, event date, and location.
  
- **Location Search:**  
  Use the Google Places API to search for pickleball courts in the Bay Area.
  
- **Secure API Key Management:**  
  The Google Places API key is stored in a `.env` file and is excluded from version control using `.gitignore`.


## Requirements

- Python 3.7+
- Flask
- Flask-SQLAlchemy
- Requests
- python-dotenv


