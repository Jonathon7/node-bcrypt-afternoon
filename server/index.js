require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { json } = require("body-parser");
const session = require("express-session");
const { register, login, logout } = require("./controllers/authController");
const {
  dragonTreasure,
  getUserTreasure,
  addUserTreasure,
  getAllTreasure
} = require("./controllers/treasureController");
const { usersOnly, adminsOnly } = require("./middleware/authMiddleware");

const app = express();

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(json());
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);

app.get("/api/treasure/dragon", dragonTreasure);
app.get("/api/treasure/user", usersOnly, getUserTreasure);
app.post("/api/treasure/user", usersOnly, addUserTreasure);
app.get("/api/treasure/all", usersOnly, adminsOnly, getAllTreasure);

massive(CONNECTION_STRING)
  .then(db => app.set("db", db), console.log("Database Connected"))
  .catch(err => {
    console.log(err);
  });

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
