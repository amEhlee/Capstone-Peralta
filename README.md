# 🤝 Capstone Peralta 
<p>Our Capstone focused on building a sample ecommerce page for our client Jane, Like any other page it would have the ability to view items, place orders and alter the status of each page and what is shown on that page.</p> 

# 🛍️ Preview 
![image](https://user-images.githubusercontent.com/76502588/222330082-f48bea61-133f-4c50-af93-8eb21f9fa22e.png)

# 💡 Tech Stack 
<h3>React.js</h3>
Used to simplify our Frontend with component based layouts
<h3>Bootstrap</h3> 
General styling and responsive design 
<h3>Spring Boot</h3>
Backend server, endpoint setup and database connectivity
<h3>MySql</h3>
Peristence and as our primary database connection

# 🪛 Installation
Prequisites include npm or Yarn to install dependencies. Java should be installed to run the backend Spring server

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
