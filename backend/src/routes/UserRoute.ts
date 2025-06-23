import { Router, Request, Response } from "express";
import { validations } from "../utils/zodValidations";
import bcrypt from "bcryptjs";
import { userModel } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";
import { CustomRequest } from "../utils/CustomRequest";
import { AccountModel } from "../models/AccountsModel";

const userRouter = Router();

userRouter.put(
  "/update",
  auth,
  async (req: CustomRequest, res: Response): Promise<void> => {
    const validate = validations.userAdd.safeParse(req.body);
    if (!validate.success) {
      res.status(411).json({ message: "incorrect inputs" });
      return;
    }

   
    try {
      const result = await userModel.updateOne(
        { _id: req.userId },
        req.body
      );
      res.status(200).json({ message: "User updated successfully", result });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter;

  try {
    const users = await userModel.find({
      username: {
        $regex: filter,
        $options: "i",
      },
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        _id: user._id,
        email : user.email
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    const validate = validations.userSignUpValidation.safeParse(req.body);
    if (!validate.success) {
      res.status(411).json({ message: "incorrect input" });
      return;
    }

    const { username, password , email} = req.body;
    
    const hashpassword = await bcrypt.hash(password, 10);

    try {
      const findUser =await userModel.findOne({ username });
      if (!findUser) {
        const user = await userModel.create({ username, password: hashpassword , email});
        res.status(200).json({ message: "user created successfully" });
        await AccountModel.create({
          userId : user._id,
          balance : 1+ 10000*Math.random()
        })
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
    const validate = validations.userSignInValidation.safeParse(req.body);
    if (!validate.success) {
      res.status(411).json({
        message: "Invalid input",
        errors: validate.error.errors,
      });
      return;
    }

    const { email, password  } = req.body;

    try {
      console.log("here");
      
      const userFound = await userModel.findOne({ email });
      if (!userFound) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      console.log(userFound);
      

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
      res.status(200).json({ message: "user logged in", token: jwttoken, username: userFound.username });
      // localStorage is not available on the server side; remove or handle on client side if needed
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default userRouter;
