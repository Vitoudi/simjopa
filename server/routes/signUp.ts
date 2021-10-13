import { Router } from "express";
import multer from "multer";
import { adaptExpressRoute } from "../adapters/adaptExpressRoute";
import { signUpJournalistController } from "../useCases/signUpJournalist";
import { signUpController } from "../useCases/SignUp";
import { multerUserStorage } from "../utils/MulterStorage";

const signUpRouter = Router();

const uploadImg = multer({ storage: multerUserStorage }).single("profileImg");

signUpRouter.post("/", uploadImg, (req, res) =>
  adaptExpressRoute(req, res, (req, res) => signUpController.handle(req, res))
);

signUpRouter.post("/journalist", uploadImg, (req, res) =>
  adaptExpressRoute(req, res, (req, res) => signUpJournalistController.handle(req, res))
);

export { signUpRouter };
