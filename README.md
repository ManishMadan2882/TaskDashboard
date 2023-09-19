# Task Dashboard Readme

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Run as localhost](#run-as-localhost)
- [Backend](#backend)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Redux States](#redux-states)
- [Demo](#demo)
## Introduction

Welcome to the Task Dashboard project! This task management application provides a user-friendly interface for managing tasks with Create, Read, Update, and Delete (CRUD) operations. The frontend of this application is built using React and Redux, while the backend is developed using Node.js and Express. MongoDB is used as the database to store task-related data.

This readme will guide you through the setup and usage of both the frontend and backend components.

## Features

- Create, Read, Update, and Delete (CRUD) operations for tasks.
- User-friendly dashboard for task management.
- Real-time updates using Redux for a seamless user experience.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed.
- MongoDB server installed and running.
- Git installed (for cloning the repository).

## Getting Started

To get started with the Task Dashboard project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ManishMadan2882/TaskDashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd TaskDashboard
   ```

## Run as localhost

The frontend of the application is built in the /frontend/dist directory and the hosted as a static page by the server-side(backend).
Running the /backend/server file starts the application.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm run start
   ```

3. Access the app at `http://localhost:5400` in your web browser.



## Database

Ensure that you have MongoDB installed and running. You can configure the MongoDB connection settings in the backend's `.env` file.

Example `.env` file for MongoDB connection:

```env
ClOUD=mongodb://localhost:27017/task-dashboard
```


## API Endpoints

The backend provides the following API endpoints for CRUD operations:

- `GET /api/read/all`: Get a list of all tasks.
- `POST /api/create`: Create a new task.
- `PUT /api/update/:id`: Update an existing task by ID.
- `DELETE /api/delete/:id`: Delete a task by ID.

## Redux states

### State Distribution
* contents - Stores the data received from backend
* isLoading -  Holds the boolean value, true if the content is not yet fetched
* error - Holds any error if occured during retreival of the contents from API(by default null)

* Illustration of Redux states
![Redux states ](image.png)

* Redux Tree 
![Alt text](image-1.png)

### Reducers

* ```createRow()``` : Creates a new row with payload passed as params
* ```updateState()``` : Updates a particular row, with unique id and updated data passed in payload
* ```deleteState()``` : Deletes a particular row passed as unique id in the payload

```fetchContent()``` : async thunk middleware - fetches the data from the server-side when the contents of the page are loading

### Demo

![pc](image-2.png)

![mobile](image-3.png)