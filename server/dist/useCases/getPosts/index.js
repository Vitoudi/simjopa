"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostsController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetPosts_1 = require("./GetPosts");
var GetPostsController_1 = require("./GetPostsController");
var getAllPostsUseCase = new GetPosts_1.GetPosts(sharedDependencies_1.postsRepository);
var getAllPostsController = new GetPostsController_1.GetAllPostsController(getAllPostsUseCase);
exports.getAllPostsController = getAllPostsController;
