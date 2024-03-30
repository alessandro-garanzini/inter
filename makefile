###################
#### Variables ####
###################

# Docker Compose local
compose_base_cmd = docker compose -f 
local_compose_file = docker-compose.yml
local_compose_cmd = $(compose_base_cmd) $(local_compose_file)
local_compose_up = $(local_compose_cmd) up -d

# Docker
docker_exec_base_cmd = docker exec
docker_exec_it_base_cmd = $(docker_exec_base_cmd) -it

# Services
BACKEND_SERVICE_NAME = backend
REDIS_SERVICE_NAME = redis
FRONTEND_SERVICE_NAME = frontend

# Containeer
BACKEND_CONTAINER_NAME = inter-backend
REDIS_CONTAINER_NAME = inter-redis
FRONTEND_CONTAINER_NAME = inter-frontend

default_branch = main

######################
###   From shell   ###
######################

### BASH ###
be_bash:
	$(docker_exec_it_base_cmd) $(BACKEND_CONTAINER_NAME) sh

fe_bash:
	$(docker_exec_it_base_cmd) $(FRONTEND_CONTAINER_NAME) sh

# Only the first time you run the project
set_up:
	$(local_compose_up)
	$(be_exec) python3 manage.py migrate

up_rebuilding: 
	$(local_compose_up) $(BACKEND_SERVICE_NAME) --build
	$(local_compose_up) $(FRONTEND_SERVICE_NAME) --build
	$(local_compose_up) nginx


up: 
	$(local_compose_up) $(BACKEND_SERVICE_NAME)
	$(local_compose_up) $(FRONTEND_SERVICE_NAME)
	$(local_compose_up) nginx

# LOCAL
up_backend:
	$(local_compose_up) $(BACKEND_SERVICE_NAME)
	make be_bash

up_backend_rebuilding:
	$(local_compose_up) $(BACKEND_SERVICE_NAME) --build
	make be_bash

up_frontend:
	$(local_compose_up) $(FRONTEND_SERVICE_NAME)
	make fe_bash

up_frontend_rebuilding:
	$(local_compose_up) $(FRONTEND_SERVICE_NAME) --build
	make fe_bash

stop:
	$(local_compose_cmd) stop 

# LOCAL
down:
	$(local_compose_cmd) down


###################
####  Laravel  ####
###################

# Esegue un comando Artisan
# Uso: make artisan cmd="migrate"
artisan:
	php artisan $(cmd)

serve:
	php artisan serve --host=0.0.0.0 --port=8181
# Esegue le migrazioni del database
migrate:
	php artisan migrate

# Esegue le migrazioni e il seeding del database
fresh:
	php artisan migrate:fresh --seed

# Esegue solo il seeding del database
seed:
	php artisan db:seed

# Accede alla shell del database
db-shell:
	docker exec -it $(CONTAINER_DB) mysql -u root -p