#!/bin/bash

if [ -n "$1" ]; then
	npm run build
	docker build --tag dev-remote-backend:$1 .
	docker tag dev-remote-backend:$1 rubenfgr/dev-remote-backend:$1
	docker push rubenfgr/dev-remote-backend:$1
else
	echo "Se necesita una parámetro para las etiquetas de los imagenes de docker"
fi
