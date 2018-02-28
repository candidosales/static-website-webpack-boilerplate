# Static Website Boilerplate

Static website boilterplate built using Webpack 3. This boilterplate features following:

- Webpack 3 with config to PWA
- ES6
- Bootstrap 4
- Font Awesome
- Sass
- Live reload using Browsersync
- Docker
- NGINX + HTTPS
- Deploy Azure

## Getting Started

Clone the repo

```sh
git clone https://github.com/candidosales/static-website-webpack-boilerplate.git
```

Install dependencies

```sh
npm install
```

Run script to start development

```sh
npm run start
```

For distribution folder run the following command and it will create a dist folder which can be placed on a server

```sh
npm run build
```

## Deploy

```sh
cd ci-scripts
bash deploy-prod.sh
```

## Build local

```sh
docker build . -t your-site
```

## Test local

```sh
docker run -p 80:80 -p 443:443 -d your-site
```

## Remove image docker

```sh
docker image rm 5b32d0cf2cdc -f
```

## License
[MIT](LICENSE)

## SSL
https://www.sslforfree.com/
