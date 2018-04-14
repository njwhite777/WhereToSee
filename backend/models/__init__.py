from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import ForeignKey
Base = declarative_base()
from .Artifact import Artifact as ArtifactModel
from .ArtifactImage import ArtifactImage as ArtifactImageModel
from .ArtifactCoordinates import ArtifactCoordinates as ArtifactCoordinatesModel
