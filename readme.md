# Ping
Ping is a real-time chat application built using the MERN stack and Socket.IO.


## Features

- Real-time messaging using Socket.IO
- Create and join chat rooms
- User authentication (registration and login)
- Sender typing animation
- Notification upon receiving a message
- Responsive design for desktop and mobile devices


## Getting Started

If you just want to check out the app, you can use the "Guest User Credentials" and log in with those credentials. Otherwise, just log in, and ask your friends to log in as well, and start chatting


Here is a demo video for creating a new chat and start messaging:


https://github.com/Darpan-Gupta/PING/assets/109506781/cb73e902-f139-4144-970f-6b85c7e8a65e




## Installation

- Clone the repository.
- Create a `.env` file in the root directory and add the following environment variables: <br>
PORT = 5000 <br>
MONGO_URI = // your  MongoDB database uri <br>
JWT_SECRET = // jwt secret <br>
NODE_ENV = // (production or debuging) <br>
- And if facing issues in socket.io functionallity update ENDPOINT in SingleChat.js to "http://localhost:5000" , and cors origin in backend/server.js to "http://localhost:3000" . 
- Make sure you are having the required dependencies installed.
- To run the server, in the root directory run command 'npm install' then 'npm start'.
- To run the frontend, open new terminal and change the directory to frontend by using 'cd frontend' and after that 'npm install' then 'npm start'.



## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.
