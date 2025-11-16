const express = require("express");
const basicAuth = require("basic-auth");
require("dotenv").config();

const app = express();

// Public route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Protected route
app.get("/secret", (req, res) => {
  const user = basicAuth(req);

  if (
    !user ||
    user.name !== process.env.USERNAME ||
    user.pass !== process.env.PASSWORD
  ) {
    res.set("WWW-Authenticate", "Basic realm=\"Protected Area\"");
    return res.status(401).send("Unauthorized");
  }

  res.send(process.env.SECRET_MESSAGE);
});

app.listen(3000, () => console.log("Server running on port 3000"));

