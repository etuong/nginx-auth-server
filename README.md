# nginx-auth-server

This repository is a prototype to configure Nginx as a reverse proxy to authenticate before accessing assets and resources of a website. A reverse proxy server is a type of proxy server that directs client requests to the appropriate backend server. While a forward proxy (or just proxy) protects the client, reverse proxy protects the server.

To get started,

1. Run the server app (default localhost:3000)
1. Build the client app (Nginx calls the build directory via nginx.conf)
1. Run Nginx using the configuration file (nginx.conf) on this repo.

## System

- Use `auth_request /auth` in [Nginx conf](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/).
- When user requests protected area, Nginx makes an internal request to `/auth`. If 201 is returned, protected contents are served. Anything else, NGINX responds with 401.
- `/auth` is reverse proxied to our server Express app which handles authentication. Cookies are passed on as well, so the auth server can check for a [JWT](https://jwt.io/).
- Auth server sets httpOnly cookie containing a JWT.
- JWT updated with new expiry each time a user visits protected area.

## Notes

You can set up your own authentication mechanism in the server/authentication.js file. For demo, I am using just a simple username and password but you can, for example, authenticate against a database.

## Role Based Access Control

In computer systems security, role-based access control or role-based security is an approach to restricting system access to authorized users. It is an approach to implement mandatory access control or discretionary access control. This app supports a prototype of RBAC. If the username is authenticated and allowed, the App logo will appear.

## Load Balancer

To demo load balancer, please build a Docker image of the React app. Dockerfile is included in the client/ folder.

Once the image is built, you'll want to run four different containers.

```
docker run -p 3001:3000 -e REACT_APP_COLOR=green -d {docker_image}
docker run -p 3002:3000 -e REACT_APP_COLOR=red -d {docker_image}
docker run -p 3003:3000 -e REACT_APP_COLOR=yellow -d {docker_image}
docker run -p 3004:3000 -e REACT_APP_COLOR=blue -d {docker_image}
```
