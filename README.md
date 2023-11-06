sudo docker compose build\

sudo docker compose run backend python3 manage.py makemigrations \
sudo docker compose run backend python3 manage.py migrate \
sudo docker compose run backend python3 manage.py createsuperuser \
sudo docker compose run backend python3 manage.py rooms 

sudo docker compose up