FROM postgres:16.6-bullseye

COPY data.sql /docker-entrypoint-initdb.d/data.sql

ENV POSTGRES_PASSWORD=password
ENV POSTGRES_USER=user
ENV PGDATA=/data