#!/usr/bin/env python
from sqlalchemy import Column, Integer, String, Float
from . import Base

class ArtifactCoordinates(Base):
    __tablename__ = 'artifactCoordinates'
    id  = Column(Integer,primary_key=True)
    lat = Column(Float)
    lon = Column(Float)

    def __init__(self,lat,lon):
        self.lat = lat
        self.lon = lon

    def __repr__(self):
        return "<ArtifactCoordinates(id='{}',lat='{}',lon='{}')>".format(self.id,self.lat,self.lon)
