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
