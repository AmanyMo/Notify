const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("./model/User");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/account/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_PW,
    },
    async (accessToken, refreshToken, profile, done) => {
      let googleid = profile.id;
      let displayname = profile.displayName;
      let image = profile.photos[0].value;
      let email = profile._json.email;

      let ExistingUser = await User.findOne({ email });
      if (ExistingUser) {
        ExistingUser.googleID = googleid;
        ExistingUser.picture=image;
        await ExistingUser.save();
        done(null, ExistingUser);
      } else {
        let newUser = new User({
          email: email,
          googleID: googleid,
          firstname: displayname,
          role: "user",
          picture: image,
        });
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);
