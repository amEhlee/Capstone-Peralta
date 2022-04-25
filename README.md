# Capstone Peralta 
<p>Our Capstone focused on building a sample ecommerce page for our client Jane, Like any other page it would have the ability to view items, place orders and alter the status of each page and what is shown on that page.</p> 

# Prerequisites
Npm or Yarn as an alternative should be installed. Java should be installed for the backend Spring server

# Tech Stack
<h3>React.js</h3>
Frontend ui framework
<h3>Bootstrap</h3> 
General styling and responsive design 
<h3>Spring Boot</h3>
Backend server, endpoint setup and database connectivity
<h3>MySql</h3>
Peristence and as our primary database connection

# Installation
- Load sample data located in the react-frontend/src/assets folder to your MySQL database ( may have to create a new schema)
- Register proper information to `application.properties` including database username and password

Execute the following commands in the project directory
```
mvn spring-boot:run
```

Execute the following commands in the server directory ( /react-frontend )
``` 
npm install 
```
``` 
npm start 
```

Access to associated app can be found at http://localhost:3000/ following these steps
