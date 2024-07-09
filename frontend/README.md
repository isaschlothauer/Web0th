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
[Frontend configuration](#setup-frontend-in-frontend) \
[Basic Commands](#basic-commands) \

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

### Setup frontend (in /frontend)
If not done so, install packages
```
pnpm i
```
#### Configure frontend in .env.local
Create an .env.local from ./frontend/.env.local.sample

** Default backend paths work with the accompanying backend. Can be changed as needed.  

<br />

### Compile and run or run in dev mode (in /frontend)
#### Basic commands

From the root/frontend directory, the application can be started concurrently. 

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
