var express = require('express');
var router = express.Router();
var fs = require('fs');

// get all mailadresses subscribed to newsletter
router.get('/', function(req, res, next) {
    fs.readFile('users.json', (err, data) => {
        if (err) throw err;

        let users = JSON.parse(data);
        let mailaddresses = [];

        users.forEach(user => {
            if (user.newsletter === true) {
                mailaddresses.push(user.email)
            }
        });

        res.send(mailaddresses);
    })
});

module.exports = router;