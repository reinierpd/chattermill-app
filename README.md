# Chattermill app
Server Side Rendered ReactJS based app powered by NextJS.

## Stack
- WebPack 4
- React 16
- NextJS
- Material-UI
- JSS
- docker
- docker-compose

## Installation

 - Install docker(optional)

 - Install docker-compose(optional)

 - Run `docker-compose up -d`(optional)

 - Run `docker exec -it chattermill-app  yarn install` if you are using
 docker, else run `yarn install`

## Usage
 - Run `docker exec -it chattermill-app  yarn dev` if you are using
 docker else, else run `yarn dev`
 - Open the browser with address http://localhost:3002 if using docker else
 http://localhost:3000

## Tests
 - Run `docker exec -it bid-4-meal  yarn test` if you are using
 docker else, else run `yarn test`

## Code quality
 - Using eslint with Airbnb preset and prettier for code formatting

## Deploy
- Run `docker exec -it bid-4-meal  yarn build` if you are using
 docker else, else run `yarn build`

## Designs considerations.
Due that filters are reused in the dashboard and the feed views, I created
the component `WithFilterData` that hold all the filtering logic and share the filtered data
using the render-props pattern.

Note: Take into consideration that the calculated annotations aren't  reliable because
the reviews have pagination and from the client app, you only can calculate the first page.