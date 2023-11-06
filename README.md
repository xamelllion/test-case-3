## Сборка и запуск

```bash

sudo docker compose build

sudo docker compose run backend python3 manage.py makemigrations 
sudo docker compose run backend python3 manage.py migrate 
sudo docker compose run backend python3 manage.py createsuperuser 
sudo docker compose run backend python3 manage.py rooms 

sudo docker compose up
```

## About

backend запустится по адресу 0.0.0.0:8765\
frontend запустится по адресу 0.0.0.0:3000