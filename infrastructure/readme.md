### Infrastructure of for the Project
This folder contains the docker files for the infrastructure of the project.
It may also contain build information for different modules if there are special steps to build parts of the application.


## Dependencies
docker-compose is the only dependency.
sudo apt get install docker-compose


## Run Command
docker-compose up


## Main Components
Database: Docker container with Postgresql
    --> Container name aliased to: postgres-db
    --> Port exposed: 9876
    --> Database: main-db
    --> Username: chat-application
    --> Password: this_p4ssw0rd-??-is_3s34y
