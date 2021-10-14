"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJournalistsController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetJournalists_1 = require("./GetJournalists");
var GetJournalistsController_1 = require("./GetJournalistsController");
var getJournalistsUseCase = new GetJournalists_1.GetJournalists(sharedDependencies_1.journalistsRepository);
var getJournalistsController = new GetJournalistsController_1.GetAllJournalistsController(getJournalistsUseCase);
exports.getJournalistsController = getJournalistsController;
