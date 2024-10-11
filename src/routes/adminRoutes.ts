import {Router} from 'express';
import {Assignment} from '../utils/db';
import {validateAdmin} from '../middlewares/validateAdmin';
const router=Router();
// admin-specific routes

// get all assignment for tagged to the admin who is logged-in
router.get('/assignments', validateAdmin, async (req:any, res:any,next:any)=>{
    try{
    const adminName=req.user!.adminname; 
    const assignments=await Assignment.find({admin:adminName}); 
    res.status(200).send(assignments);
            //}
    }catch(err) {
        next(err);
    }
});

// accepting/rejecting an assignment using assignment id(default mongoDB _id is used here)

//accept route
router.post('/assignments/:id/accept', validateAdmin, async (req:any, res:any, next:any)=>{
    try{
        const assignmentId=req.params.id;
        const newAssignment= await Assignment.findByIdAndUpdate(
            assignmentId,
            {isAccepted:'accepted'},
            {new:true}
        );
        // if an invalid assingment id is specified or assignment not found
        if(!newAssignment) return res.status(404).send('pls enter a valid assignment id');
        res.status(200).send(newAssignment);
    }catch(err){
        next(err);
    }

});

// reject route
router.post('/assignments/:id/reject', validateAdmin, async (req,res,next)=>{
    try{
         const assignmentId=req.params.id;
        const newAssignment= await Assignment.findByIdAndUpdate(
            assignmentId,
            {isAccepted:'rejected'},
            {new:true}
        );
        res.status(200).send(newAssignment);
    }catch(err){
        next(err);
    }

});

export const adminRoutes=router;
