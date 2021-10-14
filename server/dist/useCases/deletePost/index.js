"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var DeletePost_1 = require("./DeletePost");
var DeletePostController_1 = require("./DeletePostController");
var deletePostUseCase = new DeletePost_1.DeletePost(sharedDependencies_1.postsRepository);
exports.deletePostController = new DeletePostController_1.DeletePostController(deletePostUseCase, sharedDependencies_1.checkIfPostBelongsToJournalistByUserIdService);
