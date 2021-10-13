import { Router } from "express";
import multer from "multer";
import { adaptExpressRoute } from "../adapters/adaptExpressRoute";
import { UserRole } from "../entities/User";
import { requireRole } from "../middlewares/requireRole";
import { ExpressWrapperRequest } from "../Request&Response/ExpressWrapperRequest";
import { createCommitteController } from "../useCases/createCommitte";
import { getAllCommittesController } from "../useCases/getCommittes";
import { getCommitteController } from "../useCases/getCommitte";
import { multerCommitteStorage } from "../utils/MulterStorage";

const update = multer({ storage: multerCommitteStorage }).single("committeImg");

const committesRouter = Router();

committesRouter.get('/', (req, res) => adaptExpressRoute(req, res, (req, res) => getAllCommittesController.handle(req, res) ))

committesRouter.get("/:id", (req, res) =>
  adaptExpressRoute(req, res, (req, res) => getCommitteController.handle(req, res))
);

committesRouter.use(requireRole(UserRole.ADMIN));

committesRouter.post("/", update, (req, res) =>
  adaptExpressRoute(req, res, (req, res) => createCommitteController.handle(req, res))
);

export { committesRouter };