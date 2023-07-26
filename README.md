# Boardgame-app
> Welcome to Boardgame-app, the comprehensive digital library of board games! 
> Dive into a world of board games with a vast collection of classic and modern titles, where you can explore, search, and learn about various games all in one place.
>
> Live demo [_here_](https://boardgame-app-production.up.railway.app/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
- Project is fullstack application with implemented features you can see in almost all websites on the internet.
- The purpose of this project was to learn Nestjs and relational databases in general and also refresh knowlage about React.
- App is monorepo deployed on Railway


## Technologies Used On Backend
- Postgres - version 8.1
- Nestjs - version 10
- Typscript - version 5.1
- Typeorm - version 0.3
- Bcrypt - version 5.1
- Passport - version 0.6
- Class-validator - version 0.14
- Class-transformer - version 0.5


## Technologies Used On Frontend
- Javascript ES6
- Vite - version 4.3
- React - version 18.2
- Bootstrap - version 5.3
- React router dom - version 6.1
- React hot toast - version 2.4
- Tanstack React Query - version 4.2
- Zustand - version 4.3
- Eslint version 8.3


## Features
List the ready features here:
- Browse over list of 5000 boardgames all paginated!
- View detail page for every boardgame
- Create account
- Login/logout
- Change password
- Delete account
- Add boardgames to your wishlist/played list
- Remove boardgames from your lists
- View other users lists/profiles
- Search boardgames by: name, max players, designer, category etc.
- View top10 lists of boardgames

## Setup
For project to start locally you first need to have Docker installed on your computer.


## Usage
Since project is using Turborepo you just need to type two commands:

`git clone https://github.com/thatguyKacper/boardgame-app.git`

`npm install`

`npm run dev`

And thats it! Migration with boargames data will be done authomaticly.


## Project Status
Project is: _in progress_.


## Room for Improvement
There is still a lot of ideas and posible improvements but some are:

Room for improvement:
- Chat for users (websocket)
- Switch REST API to Graphql
- Prisma or Sequelize instead of Typeorm
- Replace fetch api to Axios
- Switch to Typescript on frontend

To do:
- Last viewed
- Sorting
- Scoring
- Review/Opinion
- Some image upload (for user avatar)
- Dark mode
- Graphical charts


## Contact
Created by [Kacper Wójtowicz](www.linkedin.com/in/kacper-wojtowicz/) - feel free to contact me!
