"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var CreatePost_1 = require("./CreatePost");
var CreatePostController_1 = require("./CreatePostController");
var createPostUseCase = new CreatePost_1.CreatePost(sharedDependencies_1.postsRepository);
var createPostController = new CreatePostController_1.CreatePostController(createPostUseCase);
exports.createPostController = createPostController;
