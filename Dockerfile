# Builds a Docker to deliver dist/
# Alternatively, use nginx:alpine for a smaller image
FROM nginx:1.13.0-alpine

COPY dist/ /usr/share/nginx/html
COPY nginx-conf/ /etc/nginx

EXPOSE 80 443