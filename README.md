<div style="text-align: right"> Nathan White </div>
<div style="text-align: right"> Aron Kageza </div>
<div style="text-align: right"> Cody Tebbe </div>
<div style="text-align: right"> Madeline VanNess </div>
<div style="text-align: right"> 20180425 </div>


Wheretosee setup manual:
=
### Introduction:


#### Hardware & System Requirements:
The application has been implemented as a web application, consequently, a network connected server is necessary.  The server should have at least 1 CPU and 4GB RAM.  The system requires a linux based operating system, but should be relatively straight forward to adapt to a windows environment.     


### <a name="The_Project"></a> The Project:
The following section describes the project development, the tools, subsystems, languages, and environments that were used in the development of the project.  It also includes some architectural information in the section called Subsystems.


#### <a name="Languages_and_Tools"></a>Languages and Tools:
Languages:
- Python3
- ECS6   

Frameworks:
- Angular1
- Flask/flask-socketio

Key Modules:
- <a href="https://flask-socketio.readthedocs.io/en/latest/">Flask-socketIO</a> (backend)
- <a href="https://github.com/invisibleroads/socketIO-client">Socketio-client </a> (backend)
- <a href="http://flask-cors.readthedocs.io/en/latest/">CORS </a>(backend)
- <a href="https://github.com/socketio/socket.io-client">socket.io-client</a>
- <a href="https://github.com/btford/angular-socket-io">angular-socket-io</a>
- <a href="https://github.com/zarocknz/javascript-winwheel"> winwheel
- <a href="https://github.com/angular-ui/ui-router">angular-ui-router</a>
- <a href="https://github.com/grevory/angular-local-storage">angular-local-storage</a>

Text Editor:
- Atom

#### <a name="Databases"></a>Databases:
With regard to databases, the project has been configured to be flexible.  When running in dev mode a sqlite database will be created with a pre-generated schema in place in `./wheretosee_backend/db/` (assuming you are currently at project root).  By default this database is called `dev.sqlite`.  Details of this configuration can be seen in `./wheretosee_backend/settings.py`.
 
#### <a name="Interfaces"></a>Interfaces:
The frontend/backend subsystems make use of websockets for their communication.  The websocket protocol enables persistent, full duplex communication between server and clients. This makes it simple to pass real time events from clients to the server and back again as is natural in a game environment.

For the development and deployment of the application we made use of python virtual environments. This makes it easy to ensure that your application's environment is both portable and stable.

#### <a name="Development_Environment_Setup"></a>Environment Setup:
In the root level of the project there should be a file called requirements.txt this contains the python packages that are necessary to get the backend up and running.  To install the packages set up a <a href="https://gist.github.com/Geoyi/d9fab4f609e9f75941946be45000632b"> virtual environment for the wheretosee project.</a> To make this really slick, use <a href="http://virtualenvwrapper.readthedocs.io/en/latest/install.html">virtualenv wrapper</a>.  

Initialize env:
(Assuming virtualenvwrapper)
```
$ mkvirtualenv wheretosee  --python=python3
$ cd ./wheretosee/
$ pip3 install -r requirements.txt
```
As part of this installation a package called nodeenv will be installed.  This package makes it possible to virtualize the node environment inside of the virtualenv.  
Add a nodeenv:
```
$ nodeenv -p
```
Then setup necessary packages:
```
$ pwd
.../wheretosee/
$ cd frontend
$ npm i
# wait for a while
$ bower i
# wait a while longer
```
Following the above procedure should setup the necessary environment for development work.  

#### <a name="Running_in_Dev_Mode"></a>Running:
In the virtualenv for wheretosee, verify that `./run` is executable, then:
```
$ pwd
.../backend/
./run
```
Flask should spin up and a socketio server should now be listening on port 5001 (default port. see run script).  At the time of the writing of this document there were no command line flags that could be passed to the `./run` executable, though it might be nice to be able to tweak certain aspects of the program's execution using flags in the future.

To run a frontend server, open another terminal and get into the wheretosee virtual environment. cd into the frontend directory.
```
$ pwd
.../frontend/
./grunt serve
```
