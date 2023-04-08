import express, { Request, Response } from "express";
import { processRequestBody } from "zod-express-middleware";
import requireUser from "../../middleware/requireUser";

import { registerUserHandler } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = express.Router();

router.get("/", requireUser, (req: Request, res: Response) => {
  return res.send(res.locals.user);
});

router.post(
  "/",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
