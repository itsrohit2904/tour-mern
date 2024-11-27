# My API

This is a simple API for managing tours and users. It supports user registration, login, and CRUD operations for tours. The API also includes Swagger documentation for easy exploration and testing of available endpoints.

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (use MongoDB Atlas or local installation)
- dotenv (for environment variables)
  
### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <https://github.com/itsrohit2904/tour-mern.git>
   cd <tour-backend>

## Installation

1. Install the required dependencies:

```bash
  npm install

```
2. Create a .env file at the root of the project and add the following environment variables
```bash
PORT=3001
MONGO_URI=<mongodb+srv://admin:admin@cluster0.pvc7p.mongodb.net/tour_backend?retryWrites=true&w=majority&appName=Cluster0>

```
3. start the server
```bash
  npm start

```
The API should now be running at http://localhost:3001.



    
## API Endpoints
# User Endpoints
1. Register a New User
- Endpoint: POST /users/register
- Request Body:
{

  "username": "string",

  "email": "string",

  "password": "string"

}

2. Login User
- Endpoint: GET /users/login
- Query Parameters:
  - email: User's email
  - password: User's password
#Tour Endpoints
1. Get All Tours
- Endpoint: GET /tours/:id
- Parameters:
  - id: User ID
2. Get a Specific Tour
- Endpoint: GET /tours/:id/:title
- Parameters:
  - id: User ID
  - title: Title of the tour
3. Create a New Tour
- Endpoint: POST /tours
- Request Body:
{

  "title": "string",

  "description": "string",

  "pick_up": "string",

  "meeting_point": "string",

  "drop_off": "string",

  "duration": number,

  "duration_unit": "string",

  "Uid": "string"

}

4. Update a Tour
- Endpoint: PUT /tours/:id
- Parameters:
  - id: Tour ID
5. Delete a Tour
- Endpoint: DELETE /tours/:id
- Parameters:
  - id: Tour ID


## Error Handling

The API returns standard HTTP status codes with error messages, as described below:

- 400 - Validation Error
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

