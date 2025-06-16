import { Router } from 'express';
import userRoute from  './UserRoute'
const router = Router();

router.use("/user" , userRoute)
// router.use("/")

export default router;