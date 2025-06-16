import { Router, Request, Response } from "express";
import { userSignUpValidation, userSignInValidation } from "../utils/zodValidations";
import bcrypt from "bcryptjs";
import { userModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    const validate = userSignUpValidation.safeParse(req.body);
    if (!validate.success) {
      res.status(411).json({ message: "incorrect input" });
      return;
    }

    const { username, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    try {
      const findUser = userModel.findOne({ username });
      if (!findUser) {
        await userModel.create({ username, password: hashpassword });
        res.status(200).json({ message: "user created successfully" });
      } else {
        res.status(500).json({ message: "user already exists" });
      }
    } catch (error) {
      res.status(500).json({ message: "internal server err" });
    }
  }
);

userRouter.post(
  "/signin",
  async (req: Request, res: Response): Promise<void> => {
    const validate = userSignInValidation.safeParse(req.body);
    if (!validate.success) {
      res.status(411).json({ 
        message: "Invalid input",
        errors: validate.error.errors 
      });
      return;
    }

    const { username, password } = req.body;

    try {
      const userFound = await userModel.findOne({ username });
      if (!userFound) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      const checkPassword = await bcrypt.compare(password, userFound.password);
      if (!checkPassword) {
        res.status(401).json({ message: "invalid credentials" });
        return;
      }

      const jwttoken = jwt.sign(
        { id: userFound._id },
        process.env.jwt_secret || " ",
        { expiresIn: "7days" }
      );
      res.status(200).json({ message: "user logged in", token: jwttoken });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default userRouter;
