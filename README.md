# Paddle Up

Paddle Up is a full-stack event scheduling platform for pickleball events in the Bay Area. Users can register, log in, create events, and search for nearby pickleball courts via the Google Places API. This project uses Flask, SQLAlchemy, and Flask-Login for the backend.

## Features

- **Event Scheduling API:** Create and list pickleball events with title, description, event date, and location.
- **User Authentication:** Register, log in, and log out (with Flask-Login).
- **Location Search:** Search for nearby pickleball courts using the Google Places API.
- **Secure Configuration:** API keys and secret keys are managed with a `.env` file (which is excluded from version control).

## Installation

1. **Clone the Repository:**

   git clone https://github.com/codedova/PaddleUp.git
   cd PaddleUp

2. **Create and Activate Environment:**

    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

3. **Install Dependencies:**

    pip install -r requirements.txt