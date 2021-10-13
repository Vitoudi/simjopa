import express, { Request, Response } from "express";
import multer from "multer";
import { adaptExpressRoute } from "../adapters/adaptExpressRoute";
import { db } from "../data/db";
import { ExpressWrapperRequest } from "../Request&Response/ExpressWrapperRequest";
import { signUpJournalistController } from "../useCases/signUpJournalist";
import { getJournalistsController } from "../useCases/getJornalists";
import { getJournalistByIdController, getJournalistByUserIdController } from "../useCases/getJournalist";
import { multerUserStorage } from "../utils/MulterStorage";

export const router = express.Router();

const upload = multer({ storage: multerUserStorage }).single("profileImg");

router.get("/", (req, res) =>
    adaptExpressRoute(req, res, (req, res) => getJournalistsController.handle(req, res))
);

router.get("/:id", (req, res) =>
  adaptExpressRoute(req, res, (req, res) =>
    getJournalistByIdController.handle(req, res)
  )
);

router.get("/user/:id", (req, res) =>
  adaptExpressRoute(req, res, (req, res) =>
    getJournalistByUserIdController.handle(req, res)
  )
);
