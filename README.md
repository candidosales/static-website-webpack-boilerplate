# Static Website Boilerplate

Static website boilterplate built using Webpack. This boilterplate features following:

- Webpack
- ES6
- Bootstrap
- Font Awesome
- Sass
- Live reload using Browsersync

## Getting Started

Clone the repo

```sh
git clone https://github.com/binoy14/static-website-webpack-boilerplate.git
```

Run script to start devlopment
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
docker build . -t moneyex-site
```

## Test local
```sh
docker run -p 80:80 -p 443:443 -d moneyex-site
```

## Remove image docker
```sh
docker image rm 5b32d0cf2cdc -f  
```

## Access SSH

```sh
ssh money-ex-website@52.234.145.175
```

## License
[MIT](LICENSE)

## SSL
https://www.sslforfree.com/