-include .env

STAGE ?= dev

####################
# STACK MANAGEMENT #
####################

.PHONY: build
build:
	docker-compose build

.PHONY: start
start:
	docker-compose up -d --remove-orphans

.PHONY: stop
stop:
	docker-compose stop

.PHONY: kill
kill:
	docker-compose down

##########
# CLIENT #
##########

.PHONY: client-shell
client-shell:
	@docker exec -it "$$(docker ps -q -f name=dungeonjs_client)" sh

.PHONY: client-install
client-install:
	@docker-compose run --rm --no-deps client npm install

.PHONY: client-build
client-build:
	@docker-compose run --rm --no-deps client npm run build
