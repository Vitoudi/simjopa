"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitteController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetCommitte_1 = require("./GetCommitte");
var GetCommitteController_1 = require("./GetCommitteController");
var getCommitteUseCase = new GetCommitte_1.GetCommitte(sharedDependencies_1.committesRepository);
var getCommitteController = new GetCommitteController_1.GetCommitteController(getCommitteUseCase);
exports.getCommitteController = getCommitteController;
