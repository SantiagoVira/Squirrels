#!/bin/sh

function cleanup ()
{
    cd ..
    docker stop "$c"
    exit
}

trap "cleanup" 2

c="$1"
docker start "$c"

if [ "$2" = "rebuild" ]; then
    cd client
    npm run build
    cd ..
fi

cd server
python manage.py runserver
