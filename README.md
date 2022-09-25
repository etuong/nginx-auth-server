# nginx-auth-server

This repository is a prototype to configure Nginx as a reverse proxy to authenticate before accessing assets and resources of a website.

To get started, 

1. Run the server app
1. Build and run the client application on Nginx using the Nginx configuration file (nginx.conf).

## System

- Use `auth_request /auth` in [NGINX conf](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/).
- When user requests protected area, NGINX makes an internal request to `/auth`. If 201 is returned, protected contents are served. Anything else, NGINX responds with 401.
- `/auth` is reverse proxied to Express app [auth-server](https://github.com/andygock/auth-server) which handles authentication. Cookies are passed on as well, so the auth server can check for a [JWT](https://jwt.io/).
- Auth server sets httpOnly cookie containing a JWT.
- JWT updated with new expiry each time a user visits protected area.

## Notes
You can set up your own authentication mechanism in the server/authentication.js file. For demo, I am using just a simple username and password but you can, for example, authenticate against a database.