cd ./server/server && rd /s /q "./__pycache__"
cd ../api
rd /s /q "./__pycache__"
rd /s /q "./migrations"
cd ..
del "./db.sqlite3"

CALL .\venv\Scripts\activate.bat
python ./manage.py makemigrations api
python ./manage.py migrate
python ./manage.py createsuperuser
python ./manage.py seed