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

На сайте выбирается дата заезда\выезда, django формирует список комнат, свободных для бронирования в это время. Есть отдельная таблица которая хранит информацию о бронях для каждой комнаты.

backend запустится по адресу 127.0.0.1:8765\
frontend запустится по адресу 127.0.0.1:3000 \

## URLs
127.0.0.1:3000/ \
127.0.0.1:3000/login \
127.0.0.1:3000/register

127.0.0.1:8765/admin