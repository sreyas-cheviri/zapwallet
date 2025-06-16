import { Router ,Request, Response} from "express";
import { userSignUpValidation} from "../utils/zodValidations"

const userRouter = Router();

userRouter.post("/signup" , async (req : Request, res : Response): Promise<void> =>{
    const validate =  userSignUpValidation.safeParse(req.body)
    if(!validate.success){
         res.status(411).json({message :  "incorrect input"});
         return;
    }
})

export default userRouter;