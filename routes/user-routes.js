var db = require("../models");
var passport = require("../config/passport");
var axios = require("axios");
require("dotenv").config();

module.exports = (app) => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(`This user has been logged ${req.user}`);
  });

  app.post("/api/users/createAccount", (req, res) => {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      // password: req.body.password,
    }).then((newUser) => res.json(newUser));
    // .then(function () {
    //   res.redirect(307, "/api/login");
    // })
    // .catch(function (err) {
    //   res.status(401).json(err);
    // });
  });

  // place logout here

  app.get("/api/users/user_info", (req, res) => {
    if (!req.user) {
      res.json({
        email: "No user email",
        id: "No IDs",
      });
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};