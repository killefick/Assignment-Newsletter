var express = require("express");
var router = express.Router();
var fs = require("fs");

// show all users
  router.get('/', function(req, res, next) {
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;
    let usersFromDb = JSON.parse(data);

    let html = "";
    html += "<html>";
    html += "<body>";

    usersFromDb.forEach((user) => {
      html += `<div id=${user.id}>`;
      html += `Id: ${user.id}<br>`;
      html += `Username: ${user.username}<br>`;
      html += `Password: ${user.password}<br>`;
      html += `Email: ${user.email}<br>`;

      if (user.newsletter === true) {
        html += `Newsletter: <input type="checkbox" id="${user.id}" name="${user.username}" checked> <br><br>`;
      } else {
        html += `Newsletter: <input type="checkbox" id="${user.id}" name="${user.username}"> <br><br>`;
      }
      html += "</div>";
    });

    html += "</body>";
    html += "</html>";

    res.send(html);
  });
});

module.exports = router;
