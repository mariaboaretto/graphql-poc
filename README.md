# GraphQL POC - Blog Web Application

## Overview

This is a Proof of Concept (POC) for a web application built using GraphQL. The application functions as a blog, allowing users to post articles and comment on them. This project aims to demonstrate the implementation of GraphQL with Apollo Server and Apollo Client for efficient data querying and manipulation, utilizing SQLite as the database. The entire application is containerized using Docker and orchestrated with docker-compose.

## Features

- Article creation: Post new articles with title, content, and tags.
- Commenting system: Engage with articles by commenting on them.
- GraphQL API: Utilize the power of GraphQL with Apollo Server.
- Client-side rendering: Implement a responsive user interface with Apollo Client.
- SQLite Database: Store articles and comments using SQLite.

## Installation

### Using Docker Compose

1. Clone the repository:

```bash
$ git clone https://github.com/mariaboaretto/graphql-poc.git
```

2. Navigate to the project directory:

```bash
$ cd graphql-poc
```

3. Create a .env file on the **/frontend** directory and set the required environment variable:
```
# Create a .env file in the /frontend directory and set the required environment variable:
REACT_APP_GRAPHQL_URL=http://localhost:4000
```

4. Run the application using Docker Compose:

```bash
$ docker-compose up -d
```

This will build the Docker containers and start the application. The -d flag runs the containers in the background.

5. Open your browser and visit http://localhost:3000 to access the application.

6. To stop the Docker Compose services and shut down the application, run the following command in the project directory:

```
$ docker-compose down --volumes --networks
```

This command will stop the services, remove the containers, volumes, and networks associated with the application.

### Without Docker Compose
If you prefer to run the application without Docker Compose, follow these steps:

1. Install the backend dependencies:

```bash
$ npm install
```

2. Navigate to **/frontend** and install the frontend dependencies:

```bash
$ cd frontend/
$ npm install
```

3. Create a .env file on the **/frontend** directory and set the required environment variable:
```
# Create a .env file in the /frontend directory and set the required environment variable:
REACT_APP_GRAPHQL_URL=http://localhost:4000
```

4. Navigate to the **/server** directory and run the following command to start the GraphQL server:

```bash
$ cd ../server/
$ node server.js
```

5. Navigate to the **/frontend** directory and run the application:
```bash
$ cd ../frontend/
$ npm start
```

6. Open your browser and visit http://localhost:3000 to access the application.

## Technologies Used
- **GraphQL with Apollo Server:** Efficiently query and manipulate data on the server.
- **Apollo Client:** Client-side rendering for a responsive user interface.
- **SQLite:** Lightweight relational database for storing articles and comments.
- **Docker and docker-compose:** Containerization and orchestration for seamless deployment.