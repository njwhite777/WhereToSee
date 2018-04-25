#!/usr/bin/env python
from app import Session,socketio,app,engine,create_db
from db import delete_db
import unittest

def main():
    socketio.run(app,debug=True,port=5001,host='localhost')
    unittest.main()

if __name__ == '__main__':
    main()
