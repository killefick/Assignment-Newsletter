var express = require("express");
var router = express.Router();
var fs = require("fs");
var cryptoJS = require("crypto-js");

router.post("/", (req, res) => {
  let userToLogin = req.body.user;
  // get users from Db
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    let usersFromDb = JSON.parse(data);

    usersFromDb.forEach((user) => {
      // matching username?
      if (userToLogin.username === user.username) {
        // decrypt password
        let decryptedPassword = cryptoJS.AES.decrypt(
          user.password,
          "test"
        ).toString(cryptoJS.enc.Utf8);
        // if password is correct
        if (decryptedPassword === userToLogin.password) {
          // create user object
          userInfo = {
            id: user.id,
            newsletter: user.newsletter,
            isLoggedIn: true,
            username: user.username,
          };
          res.send(userInfo);
        }
      }
    });
  });
});

module.exports = router;
