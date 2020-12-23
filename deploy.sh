#!/bin/bash

if [ -n "$1" ]; then
	nest build
	docker build --tag remote-backend:$1 .
	docker tag remote-backend:$1 rubenfgr/remote-backend:$1
	docker push rubenfgr/remote-backend:$1
else
	echo "Se necesita una parámetro para las etiquetas de los imagenes de docker"
fi
