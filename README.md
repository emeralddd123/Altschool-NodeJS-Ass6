# Node-AuthSystem

## Overview

Node-AuthSystem is a project aimed at exploring authentication in Node.js and Express using token-based authentication.

## Description

Node-AuthSystem is a store API that utilizes JWT tokens for authentication and authorization.

## Features

- Users can sign up and log in.
- Users can query all products in the store.
- Only admin users can create and modify products.

## Getting Started

Follow these steps to set up the project:

1. Run `npm install` to install all the required dependencies.
2. Create a `.env` file and add the necessary variables. You can use `.env.sample` as a guide.
3. Start the server by running either `npm start` or `node app.js`.
4. Seed admin user into the database by running `node seeder.js` or `npm seed`. 

## Testing the Project

You can test the project by using the provided Postman documentation. Clone the Postman collection and test all available endpoints. Access the Postman documentation [here](https://documenter.getpostman.com/view/23280484/2s9YJjQySK).

## Limitations

- The refresh token functionality has not been implemented yet.
