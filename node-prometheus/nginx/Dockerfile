FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nginx

COPY nginx.conf /etc/nginx/
COPY index.html /usr/share/nginx/html/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

CMD service nginx start