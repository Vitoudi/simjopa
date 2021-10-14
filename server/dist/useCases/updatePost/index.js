"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var updatePost_1 = require("./updatePost");
var UpdatePostController_1 = require("./UpdatePostController");
var updatePostUseCase = new updatePost_1.UpdatePost(sharedDependencies_1.postsRepository, sharedDependencies_1.checkIfPostBelongsToJournalistByUserIdService);
exports.updatePostController = new UpdatePostController_1.UpdatePostController(updatePostUseCase);
