"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByAuthTokenController = void 0;
var sharedDependencies_1 = require("../sharedDependencies");
var GetUserByAuthToken_1 = require("./GetUserByAuthToken");
var GetUserByAuthTokenController_1 = require("./GetUserByAuthTokenController");
var getUserByAuthTokenUseCase = new GetUserByAuthToken_1.GetUserByAuthToken(sharedDependencies_1.usersRepository);
exports.getUserByAuthTokenController = new GetUserByAuthTokenController_1.GetUserByAuthTokenController(getUserByAuthTokenUseCase);
