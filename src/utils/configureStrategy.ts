import passport from 'passport';
import {Strategy as GoogleStrategy, Profile} from 'passport-google-oauth20';
import {User,Admin} from '../utils/db';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});


export default  function configureStrategy() {
// configure google oAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL,
    passReqToCallback: true
}, 
    // callback function to handle user/admin authentication based on state parameter
  async function(req:any, accessToken:string, refreshToken:(string | null), profile:Profile, cb:(err:any, user?:Express.User)=>void) {
      // based on state value(string type), we pass or create the user/admin object 
      const state=req.query.state;
      console.log(profile,state);
      try{
          let user;
      if(profile.emails) {
        if(state==='user') {
          user=await User.findById(profile.id);
          if(user!=null) return cb(null,user);
          else{
              user=new User({
                  _id:profile.id,
                  username:profile.displayName,
                  email: profile.emails[0].value,
              });
              await user.save();
              return cb(null,user);
          }    
          }else {
              user=await Admin.findById(profile.id);
              if(user!=null) return cb(null,user);
              else {
                  user=new Admin({
                      _id: profile.id,
                      adminname: profile.displayName,
                      email: profile.emails[0].value,
                  });
                  await user.save();
                  return cb(null,user);
              }
          }
      }
      }catch(err) {
          return cb(err);
      }
  }
));

// serialize user-info into session
passport.serializeUser((user:any, done) => { 
  done(null, user); 
}); 

// de-serialize user from session
passport.deserializeUser((user:any, done) => { 
  done(null, user);
});
}




