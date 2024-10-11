// middleware to verify admin (protecting routes)
import {Admin} from '../utils/db';
export async function validateAdmin(req:any, res:any, next:any) {
    try{
        // first we check whether admin is authenticated and then we verify the admin from the db, so that only admin can access admin-specific routes
    if(req.isAuthenticated()) {
    const id=req.user._id;
    const response=await Admin.findById(id);
    if(response) next();
    else res.status(403).send('Unauthorized Admin')
    }else res.status(403).send('Unauthorized');
    }catch(err) {
        next(err);
    }
}
