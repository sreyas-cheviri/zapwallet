import { Router, Response } from "express";
import { CustomRequest } from "../utils/CustomRequest";
import { AccountModel } from "../models/AccountsModel";
import mongoose from "mongoose";
import { auth } from "../middleware/auth";

const AuthRouter = Router();

AuthRouter.get(
  "/balance",
  auth,
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const acc = await AccountModel.findOne({
        userId: req.userId,
      });

      if (!acc) {
        res.status(404).json({
          message: "Account not found",
        });
        return;
      }

      res.json({
        balance: acc.balance,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

AuthRouter.post("/transfer",   auth, async (req: CustomRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, recevierID } = req.body;
  const acc = await AccountModel.findOne({ userId: req.userId }).session(
    session
  );
  if (
    !acc ||
    acc.balance === null ||
    acc.balance === undefined ||
    acc.balance < amount
  ) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Insufficient balance",
    });
    return;
  }

  const recevingAcc = await AccountModel.findOne({ userId: recevierID });

  if (!recevingAcc) {
    await session.abortTransaction();
    res.status(400).json({
      message: "no acc found",
    });
    return;
  }

  await AccountModel
    .updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    .session(session);
  await AccountModel
    .updateOne({ userId: recevierID }, { $inc: { balance: amount } })
    .session(session);



    await session.commitTransaction();

    res.json({
        message : "tranfer succesful"
    })
});



export default AuthRouter;
