var express = require("express");
var router = express.Router();
var fs = require("fs");
var { v4: uuidv4 } = require("uuid");
var cryptoJS = require("crypto-js");

// register new user
router.post("/", (req, res, next) => {
  let newUser = req.body.user;
  let usersFromDb = [];

  fs.readFile("./users.json", (err, data) => {
    if (err) throw err;
    usersFromDb = JSON.parse(data);
    
    newUser.id = uuidv4();

    let encryptedPwd = cryptoJS.AES.encrypt(
      newUser.password,
      "test"
    ).toString();
    newUser.password = encryptedPwd;

    usersFromDb.push(newUser);

    let usersToSave = JSON.stringify(usersFromDb, null, 2);
    fs.writeFile("./users.json", usersToSave, (err) => {
      if (err) throw err;
    });
  });

  res.send(newUser);
});

module.exports = router;
