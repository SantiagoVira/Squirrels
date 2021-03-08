#!/bin/sh

cd client && npm run build && cd ../server && python manage.py runserver && cd ..
