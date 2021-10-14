import { Router } from "express";
import multer from "multer";
import { adaptExpressRoute } from "../adapters/adaptExpressRoute";
import { auth } from "../middlewares/auth";
import { requireRole } from "../middlewares/requireRole";
import { createPostController } from "../useCases/createPost";
import { deletePostController } from "../useCases/deletePost";
import { getAllPostsController } from "../useCases/getPosts";
import { getPostController } from "../useCases/getPost";
import { getPostsByJournalistController } from "../useCases/getPostsByJournalist";
import { increasePostVisitNumberController } from "../useCases/increasePostVisitsNumber";
import { multerPostsStorage } from "../utils/MulterStorage";
import { UserRole } from "../entities/User";
import { updatePostController } from "../useCases/updatePost";

const postsRouter = Router();

const uploadImage = multer({storage: multerPostsStorage}).single("postImg");

postsRouter.get("/", (req, res) => adaptExpressRoute(req, res, (req, res) => getAllPostsController.handle(req, res)));

postsRouter.get("/journalists/:id", uploadImage, (req, res) =>
  adaptExpressRoute(req, res, (req, res) => getPostsByJournalistController.handle(req, res)));

postsRouter.get("/:id", (req, res) =>
  adaptExpressRoute(req, res, (req, res) => getPostController.handle(req, res)));

postsRouter.put("/increase/:id", (req, res) =>
  adaptExpressRoute(req, res, (req, res) => increasePostVisitNumberController.handle(req, res)));

// Only for journalists:

postsRouter.use(auth);

postsRouter.use(requireRole(UserRole.JOURNALIST));

postsRouter.post("/create", uploadImage, (req, res) =>
  adaptExpressRoute(req, res, (req, res) => createPostController.handle(req, res)));


postsRouter.delete("/:id", (req, res) =>
  adaptExpressRoute(req, res, (req, res) => deletePostController.handle(req, res)));

postsRouter.put("/", uploadImage, (req, res) =>
  adaptExpressRoute(req, res, (req, res) =>
    updatePostController.handle(req, res)
  )
);


export { postsRouter };