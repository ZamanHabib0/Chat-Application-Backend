# Chat Application API

## Overview
This project is a RESTful API for a chat application built with Node.js, Express.js, and MongoDB. It provides backend functionality for user authentication, messaging, and friend management, making it an ideal foundation for developers looking to integrate chat features into their applications.

## Features
- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens) for session management.
- **Friend Request Management**: Users can send, accept, and manage friend requests, allowing for a network of connections.
- **Message Handling**: Users can send and retrieve messages to/from their friends, ensuring effective communication.
- **Chat History**: Fetch and manage historical chat data for users.

## API Endpoints
- **Authentication**
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user and receive a JWT.

- **Friend Management**
  - `POST /api/friends/request`: Send a friend request.
  - `GET /api/friends/requests`: Retrieve incoming friend requests.
  - `GET /api/friends`: Get a list of friends.

- **Messaging**
  - `POST /api/messages/send`: Send a message to a friend.
  - `GET /api/messages/:friendId`: Retrieve messages exchanged with a specific friend.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chat-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
### 4. Configure Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PORT=8080
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
EMAIL_USER=<your-email>
EMAIL_PASS=<your-email-password>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=<your-google-callback-url>
```

5. Start the server:
   ```bash
   npm start
   ```

## Usage
The API can be tested using tools like Postman or cURL. Make sure to include the JWT token in the Authorization header for protected routes.

## License
This project is licensed under the MIT License.

---

Feel free to modify any sections to better fit your project's specifics!
