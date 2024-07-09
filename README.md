# NextJS-Node/Express-MariaDB web Authentication (demo)
This repository contains the code base for a full stack web authentication application demo. Frontend is built on NextJS and authentication and maintaining logged in status is handled by Node / Express backend using HttpOnly cookies. 
<br />

Tech stack: <br />
- [NextJS](https://nextjs.org/) <br />
- [Node](https://nodejs.org/en) / [Express](https://expressjs.com/) <br />
- [MySql](https://www.mysql.com/) / [MariaDB](https://mariadb.org/) <br />
- [TypeScript](https://www.typescriptlang.org/) <br />
- [pnpm](https://pnpm.io/) 
<br />



### Contents
1. [Getting Started](#getting-started) \
2. [Backend and database configuration](#setup-backend-and-database-in-server) \
3. [Frontend configuration](#setup-frontend-in-frontend)\
4. [Run application](#compile-and-run-or-run-in-dev-mode-in)
<br />

## Getting started
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

In project root directory:

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
