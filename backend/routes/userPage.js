var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/:id", (req, res) => {
  let userId = req.params.id;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    // get users fom Db
    let users = JSON.parse(data);

    var loggedInUserData = users.find((u) => u.id == userId);
    delete loggedInUserData.id;
    delete loggedInUserData.email;
    delete loggedInUserData.password;

    res.send(loggedInUserData);
  });
});

router.put("/:id", (req, res) => {
  let userId = req.body.user.id;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);

    // find user
    var loggedInUserData = users.find((u) => u.id == userId);

    // change value
    loggedInUserData.newsletter = req.body.user.newsletter;

    // save to file
    let usersToSave = JSON.stringify(users, null, 2);
    fs.writeFile("./users.json", usersToSave, (err) => {
      if (err) throw err;
    });

    res.send("Newsletter changed");
  });
});
module.exports = router;
