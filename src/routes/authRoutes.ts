import {Router} from 'express';
import passport from 'passport';
const router=Router();

// NOTE: implementation for register and login is same because i have used google-oauth2
// so if a user/admin has already registered , the callback function will just pass the user/admin object attached to req
router.get('/register',(req,res,next)=>{
    // check if user/admin has already logged in or not
    if(req.isAuthenticated()) res.redirect('/');
    else{
        // if not Authenticated, redirect to google api for authentication
    res.status(200).send('<a href="/admin/auth/google">Admin Signin</a><br /><a href="/user/auth/google">User signin</a>'); 
    }
});

router.get('/login',(req,res,next)=>{
    if(req.isAuthenticated()) res.redirect('/');
    else{
       res.status(200).send('<a href="/admin/auth/google">Admin Login</a><br /><a href="/user/auth/google">User Login</a>'); 
        }
});

router.get('/admin/auth/google', (req:any, res:any, next:any)=>{
  passport.authenticate('google', { 
      scope: ['profile','email'],
      state: 'admin'  
  })(req,res,next);
});

router.get('/user/auth/google', (req:any, res:any, next:any)=>{
  passport.authenticate('google', { 
      scope: ['profile','email'],
      state: 'user' 
  })(req,res,next);
});

// after a successfull login, google will re-direct user/admin to this api(as registered in credentials)
router.get('/auth/google/redirect',  
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res)=>{
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// route for loggin-out and destroying the session and then re-direct to '/' api
router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.session.destroy((err)=>{
            if(err) return next(err);
            res.redirect('/');
        });
    })
});

export const authRoutes=router;
