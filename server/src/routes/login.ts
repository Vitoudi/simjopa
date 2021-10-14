import { Router } from "express";
import { adaptExpressRoute } from "../adapters/adaptExpressRoute";
import { loginController } from "../useCases/login";

const loginRouter = Router();

loginRouter.post("/", (req, res) =>
  adaptExpressRoute(req, res, (req, res) =>
    loginController.handle(req, res)
  )
);

export { loginRouter };
