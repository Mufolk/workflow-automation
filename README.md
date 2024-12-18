# Workflow Automation Platform

## Overview

This is a simple workflow automation platform built with Node.js and TypeScript, now structured with a core folder for business logic. The platform allows users to create and manage workflows, which are sequences of tasks that are executed in a specific order. Each task can be configured with a delay and a retry count, and the platform ensures that tasks are executed according to the workflow configuration.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: You need Node.js installed (version 14.x or later is recommended). You can download it from  [nodejs.org](https://nodejs.org/).
    
-   **Package Manager**: You will need a package manager like npm (which comes with Node.js) or yarn.
  
-   **Docker and Docker Compose**: Make sure Docker and Docker Compose are installed. You can download them from [docker.com](https://www.docker.com/).


## Running the project with Docker

1.  **Clone the Repository**: If the project is hosted on a version control system (like GitHub), clone it using:
    
    `git clone <repository-url>
    cd workflow-automation`

2. **Build the Application**: Use the command below to build the application:
    
    `docker-compose build`

3.  **Start the Application**: Use the command below to start the application:
    
    `docker-compose up`

4.  **Access the Application**: The application will be available at  [http://localhost:3000](http://localhost:3000).

## Running the project without Docker

1.  **Clone the Repository**: If the project is hosted on a version control system (like GitHub), clone it using:
    
    `git clone <repository-url>
    cd workflow-automation` 
    
2.  **Install Dependencies**: Run the following command to install all necessary dependencies:
    
    `npm install` 

3.  **Build the Project**: If you need to build the TypeScript code, run:
    
    `npm run build` 
    

4.  **Start the Application**: Use the command below to start the application:
    
    `npm start` 
    
5.  **Development Mode**: To run the application in development mode (with automatic restarts on changes), use:
    
    `npm run dev` 
    

## Additional Tools

-   **Linting**: The project uses ESLint for code linting. You can lint the code by running:
    
    `npm run lint` 
    
-   **Prettier**: Make sure to format the code with Prettier, which can be run with:
    
    `npx prettier --write .` 
    
-   **Commit Messages**: The project uses Commitlint to enforce commit message conventions. Ensure you follow the rules defined in your configuration when committing changes.
    


## API Endpoints

- `POST /workflows`: Create a new workflow.
- `GET /workflows`: Retrieve all workflows.

## Architecture Overview

- **Controllers** handle incoming requests.
- **Core** contains the essential business logic and core functionality.
- **Models** define the MongoDB schema.
- **Routes** manage API endpoint definitions.
- **Utils** provide shared utility functions.

## Design Decisions

- Introduced a core folder to enhance separation of concerns, maintainability, and scalability.
- Chose MongoDB for flexibility in storing workflow configurations.
- Implemented retry logic for robust error handling.

## License

This project is licensed under the ISC License.