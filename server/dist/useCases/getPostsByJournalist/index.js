"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByJournalistController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetPostsByJournalist_1 = require("./GetPostsByJournalist");
var getPostsByJournalistController_1 = require("./getPostsByJournalistController");
var getPostsByJournalistUseCase = new GetPostsByJournalist_1.GetPostsByJournalist(sharedDependencies_1.postsRepository);
var getPostsByJournalistController = new getPostsByJournalistController_1.GetPostsByJournalistController(getPostsByJournalistUseCase);
exports.getPostsByJournalistController = getPostsByJournalistController;
