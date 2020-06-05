var express = require("express");
var router = express.Router();
var fs = require("fs");
var cryptoJS = require("crypto-js");

// login user
router.post("/", (req, res) => {
  let userToLogin = req.body.user;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    let usersFromDb = JSON.parse(data);

    usersFromDb.forEach((user) => {
      if (userToLogin.username === user.username) {
        let decryptedPassword = cryptoJS.AES.decrypt(
          user.password,
          "test"
        ).toString(cryptoJS.enc.Utf8);

        if (decryptedPassword === userToLogin.password) {
          userData = {
            id: user.id,
            newsletter: user.newsletter,
            isLoggedIn: true,
            username: user.username,
          };
          res.send(userData);
        }
      }
    });
  });
});

module.exports = router;
