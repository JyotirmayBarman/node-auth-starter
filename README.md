# \# node-auth-starter 
  
Fully featured authenication template for node js (api only)

<div align="center"> 
  
  ![Authentication](https://user-images.githubusercontent.com/56916274/163147986-6a16e849-c590-4802-a493-405a863a7d6b.png)
 
</div>

# \# USAGE 🚀🚀🚀

|  METHOD  |         ROUTE            |                            EXPECTS                          |        DETAILS       |
|----------|--------------------------|-------------------------------------------------------------|----------------------|
| `POST`   |  `/api/v1/auth/register` | `firstName`,`lastName`,`email`,`password`,<br>`confirmPassword` | *Registers new user* |
| `POST`   |  `/api/v1/auth/verify/:token` | `token` : Verification token | *Verifies email address after registration* |
| `POST`   |  `/api/v1/auth/login` | `email`,`password` | *Logs in a verified user* |
| `POST`   |  `/api/v1/auth/resend` | `email` | *Resends verification link (valid for 24 hrs) if user is not verified* |
| `POST`   |  `/api/v1/auth/logout` | `token` : Refresh token through cookie | *Logs out an user* |
| `POST`   |  `/api/v1/auth/reset` | `email` | *Sends password reset link to existing user's email id* |
| `PATCH`  |  `/api/v1/reset/:token` | `token` : Reset token,`password`,<br>`confirmPassword` | *Resets password* |
| `PATCH`  |  `/api/v1/auth/update` | `avatar` : Optional avatar,<br>`token` : Refresh token through cookie,<br>`firstName`,`lastName`,`email`,`password`,| *Updates Profile* |
| `PATCH`  |  `/api/v1/auth/update/verify/:token` | `token` : Email updation verification token | *Updates email address* |
| `GET`    |  `/api/v1/auth/user`                 | `token` : Refresh token through cookie | *Returns the logged in user* |

# \# The required env variables

```json

PORT=8000

MONGO_URL=mongodb://localhost:27017/node_auth

# configure as your need : `redis://[[username][:password]@][host][:port][/db-number]`
REDIS_URL=redis://localhost:6379

REFRESH_TOKEN_SECRET=M@iR3fr3sHt0KenS3cR3T
VERIFY_EMAIL_SECRET=v3riFYem@@iLsssecret

MAIL_ENV=smtp
SMTP_HOST=your-smptp-relay-host
SMTP_PORT=587
SMTP_USERNAME=your@username
SMTP_PASSWORD=yourpassw0rd

```
![NOTE](https://via.placeholder.com/163x50/000000/FF0000?text=Redis)
![NOTE](https://via.placeholder.com/163x50/000000/FF0000?text=MongoDB)
![NOTE](https://via.placeholder.com/450x50/000000/FF0000?text=BOTH+ARE+REQUIRED+FOR+IT+TO+BE+FUNCTIONAL)

# \# Getting Started
**CLONE THE REPO**
  ```bash
  git clone https://github.com/JyotirmayBarman/node-auth-starter.git
  cd node-auth-starter
  npm install
  ```
  **CHANGE THE ENV VARIABLES**
  ```js
PORT=8000

MONGO_URL=mongodb://localhost:27017/node_auth

# configure as your need : `redis://[[username][:password]@][host][:port][/db-number]`
REDIS_URL=redis://localhost:6379

REFRESH_TOKEN_SECRET=M@iR3fr3sHt0KenS3cR3T
VERIFY_EMAIL_SECRET=v3riFYem@@iLsssecret

MAIL_ENV=smtp
SMTP_HOST=your-smptp-relay-host
SMTP_PORT=587
SMTP_USERNAME=your@username
SMTP_PASSWORD=yourpassw0rd
  ```
   **RUN THE DEV SERVER**

   `npm run dev`

   **RUN THE PRODUCTION SERVER**

   `npm start`
   
**THERE ARE TWO VERSIONS AVAILABLE**
1. [main](../../tree/main) : Only API is here
2. [with-scaffolding](../../tree/backend-only) : Vue frontend scaffolding included
