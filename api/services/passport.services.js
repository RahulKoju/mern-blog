import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import User from "../models/user.model.js";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (acessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
          user = new User({
            googleId: profile.id,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            password:generatedPassword,
            profilePicture: profile.photos[0].value,
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
export default passport;
