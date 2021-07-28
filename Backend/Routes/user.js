const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const strategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const User = require("../Model/userSchema");

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
  console.log(user);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id, username: profile.displayName },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
); 
passport.use(new strategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),secretOrKey:process.env.JWT_SECRET
},
function(jwt_payload, done) {
  User.findOne({googleId: jwt_payload.user.googleId}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    const user = req.user;
    const jwtTok = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(`${process.env.CLIENT}/app/?jwtTok=${jwtTok}`);
  }
);
// router.post("/login", (req, res) => {
//   const user = req.user;
//   jwt.sign({ user }, "secretkey", (err, token) => {});
// });
router.get("/logout", function (req, res) {
  res.redirect("http://localhost:3000/");
});

module.exports = router;
