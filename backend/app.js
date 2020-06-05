var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newsletterAddressesRouter = require("./routes/newsletterAddresses");
var registerUserRouter = require("./routes/registerUser");
var loginUserRouter = require("./routes/loginUser");
var userPageRouter = require("./routes/userPage");
var adminRouter = require("./routes/admin");

var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/newsletterAddresses", newsletterAddressesRouter);
app.use("/registerUser", registerUserRouter);
app.use("/loginUser", loginUserRouter);
app.use("/userPage", userPageRouter);
app.use("/admin", adminRouter);

module.exports = app;
