# Import and initialize SQLAlchemy for database models
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#Define the Event model for storing pickleball events
class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    event_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "event_date": self.event_date.strftime('%Y-%m-%d %H:%M'),
            "location": self.location
        }
