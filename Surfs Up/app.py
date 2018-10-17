# Step 2 - Climate App
# Now completing initial analysis, designing a Flask API based on the queries 
# that I have just developed.

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine, MetaData, inspect, func
from sqlalchemy.orm import Session
from flask import Flask, jsonify

# Import Panda
import numpy as np
import pandas as pd
import datetime as dt

#################################################
# Database Setup
#################################################
# Create Database Connection
engine = create_engine("sqlite:///Resources/hawaii.sqlite", connect_args={'check_same_thread': False})
# engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(bind=engine)


#################################################
# Routes Setup- List all available api routes
#################################################
# Use FLASK to create your routes.
app = Flask(__name__)

@app.route("/")
def home():
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"
    )

# Return a JSON list of stations from the dataset.
@app.route("/api/v1.0/stations")
def stations():
    """Return a list of stations"""
    # Query all stations
    results = session.query(Station).all()
    all_stations = []
    for stations in results:
        stations_dict = {}
        stations_dict["Station"] = stations.station
        stations_dict["Station Name"] = stations.name
        stations_dict["Latitude"] = stations.latitude
        stations_dict["Longitude"] = stations.longitude
        stations_dict["Elevation"] = stations.elevation
        all_stations.append(stations_dict)
    return jsonify(all_stations)

# Return JSON list of precipitation from the dataset
@app.route("/api/v1.0/precipitation")
def precipitation():
    """Query for the dates and temperature observations from 2016-2017."""
    """Convert the query results to a Dictionary using `date` as the key and `prcp` as the value."""

    results = session.query(Measurement.date, Measurement.prcp).\
        filter(Measurement.date >= '2016-08-23').filter(Measurement.date <= '2017-08-23').\
        order_by(Measurement.date).all()

    all_prcps = []
    for prcp in results:
        prcp_dict = {}
        prcp_dict["date"] = prcp.date
        prcp_dict["prcp"] = prcp.prcp
        all_prcps.append(prcp_dict)
    return jsonify(all_prcps)

# Return a JSON list of Temperature Observations (tobs) for the previous year.
@app.route("/api/v1.0/tobs")
def tobs():
    """Query for the dates and temperature observations from 2016-2017."""
    """Convert the query results to a Dictionary using `date` as the key and `tobs` as the value."""
    results = session.query(Measurement.date, Measurement.tobs).\
        filter(Measurement.date >= '2016-08-23').filter(Measurement.date <= '2017-08-23').\
        order_by(Measurement.date).all()
    
    all_tobs=[]
    for tob in results:
        tob_dict={}
        tob_dict["date"] = tob.date
        tob_dict["tobs"] = tob.tobs
        all_tobs.append(tob_dict)
    return jsonify(all_tobs)

# When given the start only, calculate  for all dates greater than and equal to the start date.
# Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
@app.route("/api/v1.0/<start>")
def start(start=None):
    """Daily Normals."""
    """ A list of tuples containing the daily normals, tmin, tavg, and tmax"""
    results = session.query(func.min(Measurement.tobs),func.avg(Measurement.tobs),func.max(Measurement.tobs)).\
        filter(Measurement.date >= start).all()

    one_day_info = []
    for tmin, tavg,tmax  in results:
        one_day_dict = {}
        one_day_dict["Minimum Temp"] = tmin
        one_day_dict["Average Temp"] = tavg
        one_day_dict["Maximum Temp"] = tmax
        one_day_info.append(one_day_dict)
    return jsonify(one_day_info)

# When given the start and end date, calculate `TMIN`, `TAVG`, and `TMAX` in date format '%Y-%m-%d'
# and return a JSON list minimum, average, and maximum temperatures for that range of dates
@app.route("/api/v1.0/<start>/<end>")
def StartToEnd(start=None,end=None):
    """TMIN, TAVG, and TMAX given a Start and End Date in %Y-%m-%d"""
    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start).filter(Measurement.date <= end).all()
    one_year_info = []
    for tmin, tavg,tmax  in results:
        one_year_dict = {}
        one_year_dict["Minimum Temp"] = tmin
        one_year_dict["Average Temp"] = tavg
        one_year_dict["Maximum Temp"] = tmax
        one_year_info.append(one_year_dict)
    return jsonify(one_year_info)

if __name__ == '__main__':
    app.run(debug=True)