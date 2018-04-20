#!/usr/bin/env python
from models import *
from app import Session,socketio
from flask_socketio import emit

def _print_item(item,message="ITEM IS"):
    print("#################################")
    print("#{} : {}".format(message,item))
    print("#################################")

@socketio.on('search_artifact_name',namespace='/io/search')
def search_artifact_name(data):
    session=Session()
    searchString=data['searchString']
    if(searchString==""):
        emit('retrieved_search_results',[])
    else:
        searchResults=ArtifactModel.getPartials(session,searchString)
        searchResults = [ item.getDict() for item in searchResults ]
        emit('retrieved_search_results',searchResults)
    session.close()

@socketio.on('get_artifact_by_id',namespace='/io/artifact')
def get_artifact_by_id(data):
    session = Session   ()
    artifactID=data['artifactID']
    artifact=ArtifactModel.getArtifactByID(session,artifactID)
    emit('retrieved_artifact',artifact.getDict())
    session.close()
