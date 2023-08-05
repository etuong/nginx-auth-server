A very simple standalone authentication server Express app.

It can be used for protecting web sites with NGINX subrequest authentication.

## Configure `.env`

- `AUTH_PORT` - Listening port of application (default: 3000)
- `AUTH_USERNAME` - Authentication username
- `AUTH_PASSWORD` - Authentication password
- `AUTH_TOKEN_SECRET` - [JWT secret](https://en.wikipedia.org/wiki/JSON_Web_Token#Structure)
- `AUTH_COOKIE_SECURE` - Secure attribute on authentication cookie sent from server. Set to `true` to enable, or if `AUTH_COOKIE_SECURE` is missing, defaults to `true`.

Refer to [dotenv documentation](https://github.com/motdotla/dotenv#readme) for formatting.

## Development

Install dependencies

    npm install

Start dev server

    npm run start

Be aware that the authentication cookie used by default uses the [secure attribute](https://en.wikipedia.org/wiki/Secure_cookie) thus the demo will only work when connecting via

- HTTPS to a non-local IP address, or
- HTTPS to a hostname other than "localhost", or
- HTTP/HTTPS to localhost.

## References

- [Nginx sub request authentication](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-subrequest-authentication/)
- [Using JWTs with NodeJS tutorial](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)
