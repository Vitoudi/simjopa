"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostController = exports.getPostUseCase = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetPost_1 = require("./GetPost");
var getPostController_1 = require("./getPostController");
exports.getPostUseCase = new GetPost_1.GetPost(sharedDependencies_1.postsRepository);
exports.getPostController = new getPostController_1.GetPostController(exports.getPostUseCase);
