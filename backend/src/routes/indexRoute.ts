import { Router } from 'express';
import userRoute from  './UserRoute'
import AuthRouter from './AccountRoute';
const router = Router();

router.use("/user" , userRoute)
router.use("/account" , AuthRouter)


export default router;