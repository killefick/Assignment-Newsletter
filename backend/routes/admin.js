var express = require("express");
var router = express.Router();

// show admin homepage
router.post("/", (req, res) => {
  let username = req.body.adminUsername;
  let password = req.body.adminPassword;

  if (username === "test" && password === "1234") {
    let html = "";
    html += "<html>";
    html += "<body>";

    html += "<h1>Välkommen Admin</h1>";

    html += '<a href="/users">Visa alla användare</a><br>';
    html +=
      '<a href="/newsletterAddresses">Visa alla newsletter emails</a><br><br>';
    html += '<a href="/">Logout</a>';

    html += "</body>";
    html += "</html>";

    res.send(html);
  } else {
    //redirect to index page
    res.redirect("/");
  }
});

module.exports = router;
