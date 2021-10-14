"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommittesController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetCommittes_1 = require("./GetCommittes");
var GetCommittesController_1 = require("./GetCommittesController");
var getAllCommittesUseCase = new GetCommittes_1.GetCommittes(sharedDependencies_1.committesRepository);
var getAllCommittesController = new GetCommittesController_1.GetCommittesController(getAllCommittesUseCase);
exports.getAllCommittesController = getAllCommittesController;
