import {validateUser} from '../middlewares/validateUser';
import {Admin,Assignment} from '../utils/db';
import {Router} from 'express';
import {z} from 'zod';
const router=Router();

// all user-specific routes

// used zod library to validate uploaded assignment by user
const assignmentSchema=z.object({
    task: z.string(),
    admin: z.string()
});

// fetch all admins
router.get('/admins', validateUser, async (req:any, res:any,next:any)=>{
    try{
    const admins=await Admin.find({},'adminname');
    res.status(200).send(admins);
    }catch(err){
        next(err);
    }
});


// upload an assignment
router.post('/upload', validateUser, async (req:any, res:any,next:any)=>{ 
    try{
        const assignment=req.body;
        const isValid=assignmentSchema.safeParse(assignment); // returns an object
        // if success: true, valid else invalid
        if(!isValid.success) return res.status(200).send('pls upload assignment in proper format');
        const user=req.user!;
        // validating the admin provided by the user
        const isAdmin=await Admin.findOne({'adminname': assignment.admin});
        console.log(isAdmin);
        if(!isAdmin) return res.status(404).send('pls enter a valid admin name');
        const date=new Date;
        // date.toString() converts UTC to Indian-Standard Time
        const newAssignment=new Assignment({
            userId: user.username,
            task: assignment.task,
            admin: assignment.admin,
            submitTime: date.toString()
        });
        const response=await newAssignment.save();
        res.status(200).send(response);
    }catch(err){
        next(err);
    }
});

export const userRoutes=router;
