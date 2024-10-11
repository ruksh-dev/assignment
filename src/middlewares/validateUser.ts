// middleware to verify user 
import {User} from '../utils/db';
export async function validateUser(req:any, res:any, next:any) {
    try{
        // first we check whether user is authenticated and then we verify the user from the db, so that only user can access user-specific routes
    if(req.isAuthenticated()) {
    const id=req.user._id;
    const response=await User.findById(id);
    if(response) next();
    else res.status(403).send('Unauthorized user');
    }else res.status(403).send('Unauthorized');
    }catch(err) {
        next(err);
    }
}
