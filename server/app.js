const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const checkAuth = require("./authentication.js");
const cors = require("cors");
const app = express();

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// rate limiter used on auth attempts
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  message: {
    status: "fail",
    message: "Too many requests, please try again later",
  },
});

dotenv.config();

const port = process.env.AUTH_PORT || 3000;
const expiryDays = 7;
const cookieSecure =
  "AUTH_COOKIE_SECURE" in process.env
    ? process.env.AUTH_COOKIE_SECURE === "true"
    : true;

const tokenSecret = process.env.AUTH_TOKEN_SECRET;
if (!tokenSecret) {
  console.error("Environment variable AUTH_TOKEN_SECRET is not found");
  process.exit(1);
}

// middleware to check auth status
const jwtVerify = (req, res, next) => {
  const token = req.cookies.authToken;

  // check for missing token
  if (!token) return next();

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      // e.g malformed token, bad signature etc - clear the cookie also
      console.log(err);
      res.clearCookie("authToken");
      return res.status(403).send(err);
    }

    req.user = decoded.user || null;
    next();
  });
};

// Check for JWT cookie from requestor, if there is a valid JWT, req.user is assigned
app.use(jwtVerify);

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/logged-in", (req, res) => {
  if (!req.user) return res.redirect("/login");
  return res.render("logged-in", { user: req.user || null });
});

app.get("/login", (req, res) => {
  // parameters from original client request
  // these could be used for validating request
  const requestUri = req.headers["x-original-uri"];
  const remoteAddr = req.headers["x-original-remote-addr"];
  const host = req.headers["x-original-host"];

  // check if user is already logged in
  if (req.user) return res.redirect("/logged-in");

  // user not logged in, show login interface
  return res.render("login", {
    referer: requestUri ? `${host}${requestUri}` : "/",
  });
});

// Called by Nginx sub-request
// expect JWT in cookie 'authToken'
app.get("/auth", (req, res, next) => {
  if (req.user) {
    // user is already authenticated, refresh cookie
    const token = jwt.sign({ user: req.user }, tokenSecret, {
      expiresIn: `${expiryDays}d`,
    });

    // set JWT as cookie, 7 day age
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 1000 * 86400 * expiryDays, // milliseconds
      secure: cookieSecure,
    });
    
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

app.post("/login", apiLimiter, (req, res) => {
  const { user, password } = req.body;

  if (checkAuth(user, password)) {
    const token = jwt.sign({ user }, tokenSecret, {
      expiresIn: `${expiryDays}d`,
    });

    // set JWT as cookie, 7 day age
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 1000 * 86400 * expiryDays,
      secure: cookieSecure,
    });
    return res.send({ status: "ok" });
  }

  res.sendStatus(401);
});

app.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.redirect("/login");
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.sendStatus(200);
});

// Default 404
app.use((req, res, next) => {
  res.status(404).send("No such page");
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
