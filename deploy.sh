#!/bin/bash

if [ -n "$1" ]; then
	echo "iniciando despliegue a producción..."
	rm -r ./dist
	npm run build
	echo "npm run build finalizado!"
	docker images -f dangling=true -q | xargs docker rmi --force
	echo "imagenes en dangling=true eliminadas!"
	docker build --tag remote-backend:$1 .
	echo "docker build finalizado!"
	docker tag remote-backend:$1 rubenfgr/remote-backend:$1
	echo "docker tag finalizado!"
	docker push rubenfgr/remote-backend:$1
	echo "despliege a producción finalizado!"
else
	echo "Se necesita una parámetro para las etiquetas de los imagenes de docker"
fi
