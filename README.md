# ❓About this project 

This project is made in order to learn and put into practice my knowledge of JavaScript on the BackEnd side, it was born as a personal project for the realization of sharing multimedia content for free, It consists of a RESTful API, which allows to perform a CRUD, complete and partial searches and image uploads.

# 📑Table of Contents
- [Features](#features)
- [Tools and Frameworks](#tools-and-frameworks)
- [Getting Started](#getting-started)
   - [Testing](#getting-started)
      - [Option 1](#option-1-using-heroku-enviroment)
      - [Option 2](#option-2-cloning-repository)
   - [Interaction with the API](#interaction-with-the-api)


# ✨Features
- Simple and easy-to-implement API for many practical and learning uses
- Full CRUD
- Full error handling to quickly see what is wrong
- Full JSON's compatibility
- Complete and partial searches
  - Custom search with statistics
- Image uploads


# 🧰Tools and frameworks
This API includes the following tools and frameworks.

- [NodeJS](https://nodejs.org/en/) with the following dependencies, if you want to learn more about these dependencies just click on their respective link.
  - [express](https://www.npmjs.com/package/express)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [cors](https://www.npmjs.com/package/cors)
  - [cross-env](https://www.npmjs.com/package/cross-env)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [express-validator](https://www.npmjs.com/package/express-validator)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [morgan](https://www.npmjs.com/package/morgan)
  - [multer](https://www.npmjs.com/package/multer)
  - [algoliasearch](https://www.npmjs.com/package/algoliasearch)
- [MongoDB](https://www.mongodb.com/)
- [Algolia](https://www.algolia.com/)

## <img src="https://emojis.slackmojis.com/emojis/images/1487369371/1776/nodejs.png?1487369371"  width="35"> NodeJS
NodeJs was used to create the entire server environment using JavaScript as the main language with the implementation of the newest features included in ES6 such as: Let, Const and Arrow functions.

## <img src="https://emojis.slackmojis.com/emojis/images/1487369371/1776/nodejs.png?1487369371"  width="35"> ExpressJS
ExpressJS was used as the main framework of the project to build the API environment.

## <img src="https://img.icons8.com/color/452/mongodb.png"  width="30"> MongoDB
MongoDB is used as the database system for this project due to its high scalability and not so complicated implementation, and since it has the basic functionalities that were needed for this project.

## <img src="https://github.algolia.com/assets/logo-algolia-22a6301916f308bf4f78b8b159b12716.svg" width="80"> Algolia 
Algolia is used as the custom search engine for the API since it has many functions that help to improve the implementation of searches easily, in addition to providing a system that allows you to know what your users are looking for, which helps to know how to easily direct the course of your project, In addition to that, it will also allow us to search for partial and total information included in the database quickly and safely through indexes.

# 💡Getting Started 
To see how this project works you have two options

## 🟡Option 1: Using Heroku enviroment
To test this API You can access the following [link](https://manga-bk.herokuapp.com/) and after accessing the link you can use [Postman](https://www.postman.com/) or any tool of your choice to interact with the API.                                                                                                                                                             
The server is currently deployed in [heroku](https://www.heroku.com/) for learning purposes only, you can use all the API features as you like to see how the API interacts.

## 🟠Option 2: Cloning repository
>To use this method you'll need an account in - [MongoDB](https://www.mongodb.com/) and [Algolia](https://www.algolia.com/)

Clone the repository and follow these steps:

1. install all the dependecies using `npm i`.

2. Register in Algolia and get your API keys, indexes and your APP ID

2. Create a database in MongoDB using the tool of your preference either Atlas, Compass or Mongo Shell and configure it.
   - Get your MongoDB URI and your username and password, after this just go to the next step
 
3. If you already have your MongoDB URI with their respective username and password just create an **.env** file and put the necessary environment variables and their values for it to work, the variables are in the example file **.env.example**.

4. After that you can easily use the command `npm run dev` to start the server in development mode and start interacting with it, by default the server runs on port 3000, you can use it or change it to the one you prefer in the main **index.js** file.

## Interaction with the API

To interact with the api you will need an access token (JWT) to place in the Header and it can be obtained by creating a new user or logging in with any of the existing users.

To be quick and simple you can use the following credentials to get your token 
>{
    "email": "heroku@heroku.com",
    "password": "heroku"
}

  - Just paste it in the body in Postman or any tool of your choice and choose the method **POST** and send it to the server as a json using the following header `Content-Type` as the key and `application/json` as the value.
  - This json must be sent to the following EndPoint to receive the Access Token https://manga-bk.herokuapp.com/users/signin, if you have any question just follow the following pictures as a guide.

### Header
![Signin example 2](https://user-images.githubusercontent.com/29514668/118193890-c0c96080-b448-11eb-9635-672201687de3.png)

### Body
![Signin example](https://user-images.githubusercontent.com/29514668/118193546-2b2dd100-b448-11eb-8efe-895e8b40d7a1.png)

after this you will receive a Token like this

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2M0YWIyY2Y0ZDFlMDc5NDBiOThjZiIsImlhdCI6MTYxOTA4NDk3OSwiZXhwIjoxNjE5MTcxMzc5fQ.yQL6octsE4scC2xj5UNwUuNETZsxWqyRyJlcpFigpao`

Now you need to add a new header with the key `x-access-token` using your token as the value, your token will expire after 1 day, that way you don't have to worry about repeating these steps again.

The main EndPoint of the API is the following:

- [Mangas](https://manga-bk.herokuapp.com/mangas) it shows a list of all the information stored in the DataBase, just click on the embedded link or copy and paste the following link in your preferred Tool to interact with API's. https://manga-bk.herokuapp.com/mangas

This endpoint can interact with the complete **CRUD**, being able to send requests with the methods, **GET, POST, PUT, DELETE.**

The **GET** method accepts as a parameter any ID that already exists and will return all the information regarding that ID, here is a example of the Endpoint
>https://manga-bk.herokuapp.com/mangas/6078b073fd30ed5df8448669.

The **POST** method only accepts the following keys: `title, author, description`.

The **PUT** method needs the ID to be able to update the values, as the **GET** filtering it is placed as a parameter in the EndPoint.

The **DELETE** method needs the ID to be able to delete the information.

