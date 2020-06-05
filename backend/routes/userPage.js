var express = require("express");
var router = express.Router();
var fs = require("fs");

// get newsletter status
router.get("/:id", (req, res) => {
  let incominUserId = req.body.user.id;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    let usersFromDb = JSON.parse(data);

    var match = usersFromDb.find((m) => m.id == incominUserId);

    res.send(match.newsletter);
  });
});

// put newsletter status
router.put("/:id", (req, res) => {
  let incominUserId = req.body.user.id;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    let usersFromDb = JSON.parse(data);

    var match = usersFromDb.find((u) => u.id == incominUserId);

    match.newsletter = req.body.user.newsletter;

    let usersToSave = JSON.stringify(usersFromDb, null, 2);
    
    fs.writeFile("./users.json", usersToSave, (err) => {
      if (err) throw err;
    });

    res.send("Newsletter changed");
  });
});
module.exports = router;
