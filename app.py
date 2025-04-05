import os
from flask import Flask, request, jsonify
from models import db, Event
from datetime import datetime
import requests
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

def create_tables():
    with app.app_context():
        db.create_all()

# Create the database tables manually before handling any requests
create_tables()


###### Event Scheduling Endpoints ######

@app.route('/api/events', methods=['POST'])
def create_event():
    
    # Get JSON data from the request
    data = request.get_json()
    try:
        
        #Parse the event_date using the wanted format
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
    
    # Lists of all events
    events = Event.query.all()
    events_list = [event.to_dict() for event in events]
    return jsonify(events_list), 200


###### Location Search Endpoint ######

@app.route('/api/locations', methods=['GET'])
def search_locations():
    
    #get the search query from the URL parameters
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

if __name__ == '__main__':
    app.run(debug=True)
