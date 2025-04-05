import os
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, Event, User
from datetime import datetime
import requests
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Set the secret key for sessions
app.config['SECRET_KEY'] = SECRET_KEY

# Initialize the database
db.init_app(app)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  

# User loader callback for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Manually create database tables within the app context
def create_tables():
    with app.app_context():
        db.create_all()

create_tables()

###############################
# User Authentication Endpoints
###############################

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully", "user": user.to_dict()}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 400
    
    login_user(user)
    return jsonify({"message": "Logged in successfully", "user": user.to_dict()}), 200

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

###############################
# Event Scheduling Endpoints
###############################

@app.route('/api/events', methods=['POST'])
@login_required
def create_event():
    data = request.get_json()
    try:
        event = Event(
            title=data.get('title'),
            description=data.get('description'),
            event_date=datetime.strptime(data.get('event_date'), '%Y-%m-%d %H:%M'),
            location=data.get('location', 'Unknown')
        )
        db.session.add(event)
        db.session.commit()
        return jsonify({"message": "Event created successfully", "event": event.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/events', methods=['GET'])
def list_events():
    events = Event.query.all()
    events_list = [event.to_dict() for event in events]
    return jsonify(events_list), 200

###############################
# Location Search Endpoint
###############################

@app.route('/api/locations', methods=['GET'])
def search_locations():
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "Missing query parameter 'q'"}), 400

    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": query,
        "key": GOOGLE_API_KEY,
        "region": "us"
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from Google Places API"}), 500

    data = response.json()
    results = data.get("results", [])
    parsed_results = [{
        "name": place.get("name"),
        "address": place.get("formatted_address"),
        "rating": place.get("rating"),
        "place_id": place.get("place_id")
    } for place in results]
    
    return jsonify(parsed_results), 200

###############################
# Frontend Endpoint (Optional)
###############################

@app.route('/')
def index():
    return render_template('index.html')

###############################
# Run the Application
###############################

if __name__ == '__main__':
    app.run(debug=True)
