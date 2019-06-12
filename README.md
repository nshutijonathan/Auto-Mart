[![Build Status](https://travis-ci.org/nshutijonathan/Auto-Mart.svg?branch=develop)](https://travis-ci.org/nshutijonathan/Auto-Mart)
[![Coverage Status](https://coveralls.io/repos/github/nshutijonathan/Auto-Mart/badge.svg?branch=develop)](https://coveralls.io/github/nshutijonathan/Auto-Mart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/715d2008e0f79b7e61c2/maintainability)](https://codeclimate.com/github/nshutijonathan/Auto-Mart/maintainability)
# Auto-mart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.


## UI Technologies
* HTML.
* CSS.
* Javascript.


### UI link
 [Auto-Mart](https://nshutijonathan.github.io/Auto-Mart/UI/html/)

### Heroku link Example

[Auto-mart](https://auto-mart1.herokuapp.com/)

### Swagger link Example
[Auto-mart-swagger](https://auto-mart1.herokuapp.com/apis-docs/)

### MY swagger  link reference
[Placide-Irandora](https://github.com/placideirandora/epic-mail/blob/develop/swagger.json)

## API ENDPOINTS
| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| / | GET | The index page |
| /api/v1/auth/signup| POST | Sign up |
| /api/v1/auth/signin| POST | Sign in |
| /api/v1/users| GET | Get all users |
| /api/v1/users/:id| GET | Get specific user |
| /api/v1/users/:id| DELETE| Delete specific user |
| /api/v1/cars| GET | Get all cars advers |
| /api/v1/car| POST | Create a car advert |
| /api/v1/orders| GET | Get all  purchasing order |
| /api/v1/order| POST| Create purchasing order  |
| /api/v1/order/:order Id | PUT| Update price of purchasing order |
| /api/v1/car/:car Id/status | PUT| Update car status |
| /api/v1/car/:car Id/price | PUT| Seller Update car price |
| /api/v1/cars/available | GET| Get all available cars |
| /api/v1/cars/:advert id | DELETE | Delete a car advert |
| /api/v1/cars/available&new | GET | Get all available and new cars |
| /api/v1/cars/available&used | GET | Get all available and used cars  |

### clone the Application

[Github](https://github.com/nshutijonathan/Auto-Mart.git)

## Tools Used

### Language
```
*Javascript*
```
### Server Environment
```
 *NodeJS* 
 ```
### Framework
```
 *Express* 
 ```
### Testing Framework
```
 *Mocha* and *Chai*
 ```
### Style Guide
```
*Airbnb*
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
nyc
```
### Git badge
```
coveralls
```
### Deployment
```
Heroku
```
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages.

```
 [Node Package Installer - NPM] this usually comes with Node.
```

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm run start
```
## Run the test
```
> npm run test
```

## Contributor
Jonathan Nshuti <nshutijonathan130@gmail.com>

---

## License & copyright
jonathan NSHUTI
 


