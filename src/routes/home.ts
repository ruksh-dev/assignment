import {Router} from 'express';
const router=Router();

// home route, ONLY desgined for testing purposes to check login/logout system
router.get('/',async (req:any, res:any, next:any)=> {
    if(req.isAuthenticated()) {
        console.log(req.user);
        res.status(200).send('u are logged in!');
        }else res.status(200).send('u are not logged in!')
});
export const homeRoute=router;
