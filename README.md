# node-auth-starter
Fully featured authenication template for node js

## USAGE 🚀🚀🚀

|  METHOD  |         ROUTE            |                            EXPECTS                          |        DETAILS       |
|----------|--------------------------|-------------------------------------------------------------|----------------------|
| `POST`   |  `/api/v1/auth/register` | `firstName`,`lastName`,`email`,`password`,<br>`confirmPassword` | *Registers new user* |
| `POST`   |  `/api/v1/auth/verify/:token` | `token` : Verification token | *Verifies email address after registration* |
| `POST`   |  `/api/v1/auth/login` | `email`,`password` | *Logs in a verified user* |
| `POST`   |  `/api/v1/auth/resend` | `email` | *Resends verification link (valid for 24 hrs) if user is not verified* |
| `POST`   |  `/api/v1/auth/logout` | `token` : Refresh token through cookie | *Logs out an user* |
| `POST`   |  `/api/v1/auth/reset` | `email` | *Sends password reset link to existing user's email id* |
| `PATCH`  |  `/api/v1/reset/:token` | `token` : Reset token,`password`,<br>`confirmPassword` | *Resets password* |
| `PATCH`  |  `/api/v1/update` | `avatar` : Optional avatar,<br>`token` : Refresh token through cookie,<br>`firstName`,`lastName`,`email`,`password`,| *Resets password* |
| `PATCH`  |  `/api/v1/update/verify/:token` | `token` : Email updation verification token | *Updates email address* |
| `GET`    |  `/user`                 | `token` : Refresh token through cookie | *Returns the logged in user* |