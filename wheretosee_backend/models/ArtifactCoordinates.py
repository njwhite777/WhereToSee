#!/usr/bin/env python
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from . import Base

class ArtifactCoordinates(Base):
    __tablename__ = 'artifactCoordinates'
    id  = Column(Integer,primary_key=True)
    lat = Column(Float)
    lon = Column(Float)
    artifactID = Column(Integer, ForeignKey('artifact.id'), nullable=True)

    def __init__(self,lat,lon,artifactID=None):
        self.lat = lat
        self.lon = lon
        self.artifactID=artifactID

    def getDict(self):
        tDict = dict()
        tDict['lat'] = self.lat
        tDict['lon'] = self.lon
        return tDict

    def __repr__(self):
        return "<ArtifactCoordinates(id='{}',lat='{}',lon='{}')>".format(self.id,self.lat,self.lon)
