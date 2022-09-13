# Reddit Site Clone Project

### Link :link: http://ec2-3-15-32-248.us-east-2.compute.amazonaws.com/

## Tech Stack

- React
- TypeScript
- PostgreSQL
- Docker
- NextJS
- AWS EC2 Deploy


When creating a reddit site, the front-end part uses React's NextJS,
The backend part used NodeJS and ExpressJS.
Both parts use TypeScript as the language. The database uses PostgreSQL and is controlled using TypeORM.


## Preview
![reddit](https://user-images.githubusercontent.com/95224457/189977885-ed517c5a-ddb1-4d14-9b46-56e913442ad6.png)


## Development Order


### 1. Starting the overall structure
>> Implementing the frontend using NextJS & TypeScript
>>> npx create-next-app@latest --typescript client
>> Implementing the backend using Node.js Express Typescript
>>> npm init
>>> npm install morgan nodemon express --sav
>>> npm install typescript ts-node @types/node @types/express @types/morgan --save-dev
>> Create tsconfig.json file
>>> A file that sets options for compiling code written in TypeScript into JavaScript
>> Running Postgres using Docker
>>> Create docker-compose.yml file
>>> Create .env file: use environment variables for security
>> Database and application connection
>>> npm install pg typeorm reflect-metadata --save
>>> npm typeorm init


* -- nodemon: Automatically restarts the server whenever the server code is changed.
* -- ts-node: Execute TypeScript directly on Node.js without going through TypeScript Complier 
* -- morgan: Middleware for log management used in nodeJS
* -- @types/express @types/node: helps define Types for Express and NodeJS
* -- pg: A collection of NodeJS modules for interfacing with PostgreSQL databases.
* -- typeorm: an object-relational mapper library that runs on NodeJS and is written in TypeScript and JavaScript (ES5, ES6, ES7, ES8).
* -- reflect-metadata: package you can do runtime reflection on types. Since TypeORM mostly works with decorator (like @Entity or @Column), this package is used to parse these decorators and use it for building SQL queries.


### 2. Creating an Entity
>> Install required modules to create Entity
>>> npm install bcryptjs class-validator class-transformer --save
>>> npm install @types/bcryptjs --save-dev

* -- bcryptjs: allows passwords to be encrypted and stored in the database
* -- class-validator: A library that uses decorators to validate properties of objects coming from requests
* -- class-transformer: class-transformer allows you to transform a generic object into some instance of a class and vice versa


### 3. Sign up & Sign in
>> Apply TailwindCSS to Next.js app
>>> npm i -D postcss-preset-env tailwindcss
>>> npx tailwind init
>>> touch postcss.config.js
>> Create the member registration page UI
>>> npm install axios --save
>>> npm install cors --save
>>> npm i --save-dev @types/cors
>> Add user information to Context
>> context > Create auth.tsx file


### 4. Creating Community
>> subs > Create create.tsx file
>> routes > subs.ts = create api
>>> npm install cookie-parser --save
>>> npm i --save-dev @types/cookie-parser
>> Create and separate User and Auth middleware
>>> User Middleware == User Information
>>> Auth Middleware == Authenticate according to user information or user level (cookie is required to authenticate whether you are logged in)



### 5. Creating Posts
>> components > Create Sidebar.tsx sidebar
>> r > [sub] > create.tsx post Create page
>> Create Post Create page function
>>> submitPost function
>>> Create api
>>> Add posts data to sub data in getSub handler
>> r > [sub] > [identifier] > [slug].tsx Create post page
>>> Get Post Data
>>> Create api


### 6. Implementing comments and voting features
>> Create Post Comments
>>> Create UI -> Create submitComment function -> Create api
>> Get Post Comments
>>> Get comment list -> Create api -> Create comment list list UI
>> Implementation of Vote function for posts and comments
>>> Call Click Event -> Call Vote function -> Create api -> Update directly using mutate ->
>> Listing Posts on Community Pages
>>> components > Create PostCard file -> Create PostCard UI
>> Creating the Vote function and using router.pathname
>>> Create Vote function -> Update directly using mutate

* -- useSWR mutate: automatically refreshed without refreshing


### 7. Creating infinite scrolling and user pages (useSWRInfinite)
* Using useSWRInfinite and the intersection observer We will implement the infinite scroll function and create a user page.


### 8. Deploy the application
>> Install and run docker on EC2 -> set security group -> set key pair -> connect to instance -> install docker
* https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04
>> Create Security Group


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
