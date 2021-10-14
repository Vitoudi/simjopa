import { Router } from "express";
import { adaptExpressRoute } from "../adapters/adaptExpressRoute";
import { signUpController } from "../useCases/SignUp";
import { getUserByAuthTokenController } from "../useCases/getUserByAuthToken";

const usersRouter = Router();

usersRouter.post("/create", (req, res) =>
  adaptExpressRoute(req, res, (req, res) =>
    signUpController.handle(req, res)
  )
);

usersRouter.get("/:token", (req, res) =>
  adaptExpressRoute(req, res, (req, res) =>
    getUserByAuthTokenController.handle(req, res)
  )
);

export { usersRouter };
