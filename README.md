# NextJS-Node/Express-MariaDB web Authentication (demo)
This repository contains the code base for a full stack web authentication application demo. Frontend is built on NextJS and authentication and maintaining logged in status is handled by Node / Express backend using HttpOnly cookies. 

<br />
Tech stack: <br />
NextJS <br />
Node / Express <br />
MySql/MariaDB <br />
TypeScript <br />

<br />
pnpm <br />


### Contents
[Get Started](#get-started) \
[Backend and database configuration](#setup-backend-and-database-in-server) \
[Frontend configuration](#setup-frontend-in-frontend)\
[Basic Commands](#basic-commands) \
[Run front and backend](#compile-and-run-or-run-in-dev-mode-in)

<br />

## Get started

### Initial setup
#### Clone repository:

```
git clone git@github.com:isaschlothauer/AutheticationDemo.git
```


#### Install dependencies from the project root directory:

```
pnpm i -r
```
<br />

### Setup backend and database (in /server)
#### Preparing database and import database file 


Create project database in MySQL (mysql) or MariaDB (mariadb) and run: 

```
mysql -u your_username -p database_name < ./server/src/models/database.sql
```

#### Configuring database access in .env
Create an .env from ./server/.env.sample

** Change front and back ports as needed. Cors uses F_PORT for its configuration. 

<br />

### Setup frontend (in /frontend)
If not done so, install packages
```
pnpm i
```
#### Configure frontend in .env.local
Create an .env.local from ./frontend/.env.local.sample

** Default backend paths work with the accompanying backend. Can be changed as needed.  

<br />

### Compile and run or run in dev mode (in /)
#### Basic commands

From the root directory, the application can be started concurrently. 

Dev mode:
```
pnpm run dev
```
Build:
```
pnpm run build
```
Run:
```
pnpm run start
````

### Troubleshoot
Q: Backend crashes at start

A: Database imported and properly configured? .env file created and configured? Make sure that the port is not trying to use already used port.