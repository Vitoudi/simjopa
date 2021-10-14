"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var adaptExpressRoute_1 = require("../adapters/adaptExpressRoute");
var auth_1 = require("../middlewares/auth");
var requireRole_1 = require("../middlewares/requireRole");
var createPost_1 = require("../useCases/createPost");
var deletePost_1 = require("../useCases/deletePost");
var getPosts_1 = require("../useCases/getPosts");
var getPost_1 = require("../useCases/getPost");
var getPostsByJournalist_1 = require("../useCases/getPostsByJournalist");
var increasePostVisitsNumber_1 = require("../useCases/increasePostVisitsNumber");
var MulterStorage_1 = require("../utils/MulterStorage");
var User_1 = require("../entities/User");
var updatePost_1 = require("../useCases/updatePost");
var postsRouter = express_1.Router();
exports.postsRouter = postsRouter;
var uploadImage = multer_1.default({ storage: MulterStorage_1.multerPostsStorage }).single("postImg");
postsRouter.get("/", function (req, res) { return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return getPosts_1.getAllPostsController.handle(req, res); }); });
postsRouter.get("/journalists/:id", uploadImage, function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return getPostsByJournalist_1.getPostsByJournalistController.handle(req, res); });
});
postsRouter.get("/:id", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return getPost_1.getPostController.handle(req, res); });
});
postsRouter.put("/increase/:id", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return increasePostVisitsNumber_1.increasePostVisitNumberController.handle(req, res); });
});
// Only for journalists:
postsRouter.use(auth_1.auth);
postsRouter.use(requireRole_1.requireRole(User_1.UserRole.JOURNALIST));
postsRouter.post("/create", uploadImage, function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return createPost_1.createPostController.handle(req, res); });
});
postsRouter.delete("/:id", function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) { return deletePost_1.deletePostController.handle(req, res); });
});
postsRouter.put("/", uploadImage, function (req, res) {
    return adaptExpressRoute_1.adaptExpressRoute(req, res, function (req, res) {
        return updatePost_1.updatePostController.handle(req, res);
    });
});
