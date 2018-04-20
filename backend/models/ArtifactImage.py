#!/usr/bin/env python
from sqlalchemy import Column, Integer, String, ForeignKey
from . import Base

class ArtifactImage(Base):
    __tablename__ = 'artifactImage'
    id          = Column(Integer,primary_key=True)
    artifactUrl = Column(String)
    artifactDescription = Column(String)
    artifactID    = Column(Integer, ForeignKey('artifact.id'), nullable=True)

    def __init__(self,artifactUrl,artifactDescription):
        self.artifactUrl=artifactUrl
        self.artifactDescription=artifactDescription

    def getDict(self):
        tDict = dict()
        tDict['id']=self.id
        tDict['artifactUrl']=self.artifactUrl
        tDict['artifactDescription']=self.artifactDescription
        tDict['artifactID']=self.artifactID
        return tDict

    def __repr__(self):
        return "<ArtifactImage(id='{}',artifactUrl='{}',artifactDescription='{}')>".format(self.id,self.artifactUrl,self.artifactDescription)
