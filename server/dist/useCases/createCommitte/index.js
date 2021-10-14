"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommitteController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var CreateCommitte_1 = require("./CreateCommitte");
var CreateCommitteController_1 = require("./CreateCommitteController");
var createCommitteUseCase = new CreateCommitte_1.CreateCommitte(sharedDependencies_1.committesRepository);
exports.createCommitteController = new CreateCommitteController_1.CreateCommitteController(createCommitteUseCase);
