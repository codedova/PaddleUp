## Paddle Up

Paddle Up is a full‑stack event scheduling platform for pickleball events. It allows users to register, log in, create events, view a list of events, and search for nearby pickleball courts using the Google Places API. The backend is built with Flask (with Flask‑Login, Flask‑SQLAlchemy, and Flask‑CORS) and the frontend is built with React and Material‑UI for a modern, responsive user interface.

## Features
User Authentication:
Register, log in, and log out with session management via Flask‑Login.

Event Management:
Create and list events. (Future enhancements may include editing and deleting events.)

Location Search:
Search for nearby pickleball courts using the Google Places API.

Modern UI/UX:
A React frontend styled with Material‑UI with custom backgrounds for different sections.

Cross‑Origin Support:
Configured CORS and session cookies to allow secure communication between the frontend and backend.

## Technologies
Backend: Python, Flask, Flask‑Login, Flask‑SQLAlchemy, Flask‑CORS, Requests, python‑dotenv

Frontend: React, Material‑UI, Axios, React Router

Database: SQLite

APIs: Google Places API

## Installation 

Prerequisites
- Python 3.7+
- Node.js and npm

Clone the Repository

        git clone https://github.com/codedova/PaddleUp.git
        cd PaddleUp

## Backend Setup
- Create a Virtual Environment:

        python3 -m venv venv

Activate the Virtual Environment:

        source venv/bin/activate <--- macOS
        venv\Scripts\activate <--- windows

Install Dependencies:
- Navigate to the backend folder and install the required packages: 

        cd backend
        pip install -r requirements.txt

Configure Environment Variables:
- Create a .env file in the backend folder with the following content:

        GOOGLE_API_KEY=your_google_api_key_here
        SECRET_KEY=your_secret_key_here

Set Additional Flask Configurations:
- In app.py, ensure you have the following configurations (placed after setting the secret key):

        app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
        app.config['SESSION_COOKIE_SECURE'] = False  

Run the Flask Backend:

        python app.py


## Frontend Setup 

Navigate to the Frontend Folder:

        cd ../frontend

Install Frontend Dependencies:

        npm install

Start the React Development Server:

        npm start


## Usage
Register and Login:
- Navigate to the Register and Login pages from the navigation menu.
- Register a new user and then log in to access protected features.

Create an Event:
- After logging in, go to the Create Event page.
- Fill out the form using the format MM-DD-YYYY HH:MM for the event date.
- Submit the form to create an event. Verify that it appears in the Event List.

View Events:
- The Event List page displays a list of all created events.

Search Locations:
- Navigate to the Location Search page and enter a query (e.g., "pickleball court bay area"). Results are fetched using the Google Places API.

## Future Enhancements
- Add edit and delete functionality for events.

- Develop a user profile dashboard for managing created events.

- Integrate maps to display event locations visually.

- Deploy the application with Docker to a cloud platform for a live demo.

## License
This project is licensed under the MIT License.




