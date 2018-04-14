#!/usr/bin/env python
from models import *
from app import Session,socketio, socketIOClients,turnTimers
from flask_socketio import emit

def print_item(message="MESSAGE GENERATED",item):
    print("#################################")
    print("#{} : {}".format(message,item))
    print("#################################")

@socketio.on('search_artifact_name',namespace='/io/search')
def search_artifact_name(data):
    pass

@socketio.on('get_artifact_by_id',namespace='/io/artifact')
def search_artifact_name(data):
    pass
