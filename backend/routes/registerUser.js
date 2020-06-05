var express = require("express");
var router = express.Router();
var fs = require("fs");
var { v4: uuidv4 } = require("uuid");
var cryptoJS = require("crypto-js");

router.post("/", (req, res, next) => {
  let newUser = req.body.user;
  let savedUsers = [];

  fs.readFile("./users.json", (err, data) => {
    if (err) throw err;
    savedUsers = JSON.parse(data);
    
    newUser.id = uuidv4();

    let encryptedPwd = cryptoJS.AES.encrypt(
      newUser.password,
      "test"
    ).toString();
    newUser.password = encryptedPwd;

    savedUsers.push(newUser);

    let usersToSave = JSON.stringify(savedUsers, null, 2);
    fs.writeFile("./users.json", usersToSave, (err) => {
      if (err) throw err;
    });
  });

  res.send(newUser);
});

module.exports = router;
