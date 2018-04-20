#!/usr/bin/env python
from flask import Flask,request
import random, threading, webbrowser
from flask_restful import Api, Resource
from flask_socketio import SocketIO,emit
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import ArtifactModel,ArtifactImageModel,ArtifactCoordinatesModel

# TODO: there is still more restructuring to happen.
from db import create_db
# TODO: This is where the ORM magic happens. Make sure additional classes are
#  created in ./models and imported by __init__.py
import argparse
import sys
from IPython import embed


app = Flask(__name__, static_url_path='/static')
socketio = SocketIO(app)

# TODO: more db setup based on the env that gets passed in.
engine = create_engine("sqlite:///db/{}.sqlite".format("dev"))
create_db(engine)
Session = sessionmaker(bind=engine)
