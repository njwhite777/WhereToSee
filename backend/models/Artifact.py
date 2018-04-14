#!/usr/bin/env python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from . import Base

class Artifact(Base):
    __tablename__ = 'artifact'
    id  = Column(Integer,primary_key=True)
    name = Column(String)
    description = Column(String)

    images = relationship("artifactImage",backref="artifact", lazy = False)
    coordinates = relationship("artifactCoordinates",backref="artifact",lazy=False, uselist=False)

    def __init__(self,name,description,images=[],coordinates=None):
        self.name=name
        self.description=description
        self.images=images
        self.coordinates=coordinates

    def addCoordinates(self,coordinates):
        self.coordinates=coordinates

    def addImage(self,artifactImage):
        self.images.append(artifactImage)

    def __repr__(self):
        return "<Artifact(id='{}',name='{}',description='{}',)>".format(self.id,self.lat,self.lon)
