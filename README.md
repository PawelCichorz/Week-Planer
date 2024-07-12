# Complete Week Planer 
It's a project that incorporates a React-based frontend and a node.js-based backend
The project is connected to a mongo DB database. The application includes a complete registration and authentication system. Logged in user can add , edit and delete notes. 
When adding a note, the userId of the user is assigned to the note so that the notes are filtered and only the user's notes are displayed to the logged-in user. 
The whole backend is based on well-configured RestApi.The project also includes testing is and cypress
## Technologies 
-React
-Node
-Express
-Mongo DB
-JWT
## How to run App 
git clone https://github.com/PawelCichorz/Week-Planer.git
cd Week-Planer

cd frontend
npm install

cd backend
npm install

In the backend directory, create a .env file and add the following variables:
PORT=5000  # Example port number, replace with your preferred port
MONGO_URI=your_mongodb_uri  # Replace with your MongoDB connection URI
JWT_SECRET=your_jwt_secret  # Replace with a secure JWT secret

npm start
npm run dev

## Funcionality
- User registration and login with full JWT authentication
- Management of notes: add, delete, edit
- To-do list for each day of the week
- use of many additional libraries

## Author
Pawel cichorz pawelcichorz74@gmail.com




