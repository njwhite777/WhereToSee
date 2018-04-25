from app import Session,socketio,app,engine,create_db
from db import delete_db
from models import ArtifactImageModel,ArtifactModel,ArtifactCoordinatesModel
from models import Base as AppModelBase
import unittest

def get_by_id(model,id):
    session=Session()
    artifact = session.query(model).get(id)
    artifactID = artifact.id
    session.close()
    assert artifactID == id

def create_insert_object_from_model(model,artifactObject):
    session = Session()
    session.add(artifactObject)
    session.commit()
    artifactID = artifactObject.id
    artifact = session.query(model).get(artifactObject.id)
    arttifactID1=artifact.id
    session.close()
    assert arttifactID1 == artifactID

def setup_data():
    delete_db(engine)
    session = Session()
    AppModelBase.metadata.create_all(engine)

    acs=[ArtifactCoordinatesModel(lat=40.09389490340147,lon=-85.62538134792705),ArtifactCoordinatesModel(lat=40.09585039419487,lon=-85.62004021718168),ArtifactCoordinatesModel(lat=40.09451269825916,lon=-85.62251577299321)]
    aims=[ArtifactImageModel('/static/whiteoak.jpg','The white oak tree'),ArtifactImageModel('/static/entrance.jpg','The visitor center'),ArtifactImageModel('/static/greatmound.jpg','The great mound!')]
    artifacts = [ArtifactModel(name="White Oak",description="The white oak tree"),ArtifactModel(name="Visitor Center",description="The visitor center."),ArtifactModel(name="Great Mound",description="The great mound.")]

    for loc in acs:
        session.add(loc)

    for a in aims:
        session.add(a)

    for idx,artifact in enumerate(artifacts):
        artifact.addCoordinates(acs[idx])
        artifact.addImage(aims[idx])
    session.commit()
    session.close()


class ArtifactORMTest(unittest.TestCase):

    def setUp(self):
        setup_data()

    def test_get_artifact_by_id(self):
        get_by_id(ArtifactModel,1)

    def test_create_new_artifact(self):
        create_insert_object_from_model(ArtifactModel,ArtifactModel(name="Red Oak",description="The red oak tree"))

class ImageORMTest(unittest.TestCase):

    def setUp(self):
        setup_data()

    def test_get_artifactImage(self):
        get_by_id(ArtifactImageModel,1)

    def test_create_new_artifactImage(self):
        create_insert_object_from_model(ArtifactImageModel,ArtifactImageModel('/static/whiteoak.jpg','The red oak tree'))

class CoordinatesORMTest(unittest.TestCase):

    def setUp(self):
        setup_data()

    def test_get_artifactCoordinates(self):
        get_by_id(ArtifactCoordinatesModel,1)

    def test_create_new_artifactCoordinates(self):
        create_insert_object_from_model(ArtifactCoordinatesModel,ArtifactCoordinatesModel(lat=40.09389490340188,lon=-85.62538134792705))
