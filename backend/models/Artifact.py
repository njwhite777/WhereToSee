#!/usr/bin/env python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from . import Base

class Artifact(Base):
    __tablename__ = 'artifact'
    id  = Column(Integer,primary_key=True)
    name = Column(String)
    description = Column(String)

    images = relationship("ArtifactImage",backref="artifact", lazy = False)
    coordinates = relationship("ArtifactCoordinates",backref="artifact",lazy=False, uselist=False)

    def __init__(self,name,description,images=[],coordinates=None):
        self.name=name
        self.description=description
        self.images=images
        self.coordinates=coordinates

    @classmethod
    def getArtifactByID(Artifact,session,id):
        return session.query(Artifact).get(id)

    @classmethod
    def getPartials(Artifact,session,queryString):
        return session.query(Artifact).filter(Artifact.name.contains(queryString)).all()

    def addCoordinates(self,coordinates):
        self.coordinates=coordinates

    def addImage(self,artifactImage):
        self.images.append(artifactImage)

    def getDict(self):
        tDict = dict()
        tDict['id']=self.id
        tDict['name']=self.name
        tDict['description']=self.description
        tDict['images']=[ image.getDict() for image in self.images ]
        tDict['coordinates']=self.coordinates.getDict()
        return tDict

    def __repr__(self):
        return "<Artifact(id='{}',name='{}',description='{}',)>".format(self.id,self.name,self.description)
