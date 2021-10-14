"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increasePostVisitNumberController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var IncreasePostsVisitsNumberController_1 = require("./IncreasePostsVisitsNumberController");
var IncresePostVisitNumber_1 = require("./IncresePostVisitNumber");
var increasePostVisitsNumberUseCase = new IncresePostVisitNumber_1.IncreasePostVisitNumber(sharedDependencies_1.postsRepository);
exports.increasePostVisitNumberController = new IncreasePostsVisitsNumberController_1.IncreasePostVisitNumberController(increasePostVisitsNumberUseCase);
