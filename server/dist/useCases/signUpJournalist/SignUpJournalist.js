"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpJournalist = void 0;
var Jornalist_1 = require("../../entities/Jornalist");
var User_1 = require("../../entities/User");
var HttpResponses_1 = require("../../utils/HttpResponses");
var SignUpJournalist = /** @class */ (function () {
    function SignUpJournalist(journalistsRepository, emailsInfosRepository, signUpUseCase) {
        this.journalistsRepository = journalistsRepository;
        this.emailsInfosRepository = emailsInfosRepository;
        this.signUpUseCase = signUpUseCase;
    }
    SignUpJournalist.prototype.execute = function (_a) {
        var committeId = _a.committeId, imgFileName = _a.imgFileName, name = _a.name, password = _a.password, email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var emailHasJournalistPermissions, loginResponse, journalist, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.emailsInfosRepository.checkIfEmailHasUserRolePermissions({ email: email, roleId: User_1.UserRole.JOURNALIST })];
                    case 1:
                        emailHasJournalistPermissions = _b.sent();
                        if (!emailHasJournalistPermissions)
                            return [2 /*return*/, { success: false, msg: "Email fornecido não é válido", statusCode: HttpResponses_1.HTTP_STATUS_CODES.UNAUTHORIZED }];
                        return [4 /*yield*/, this.signUpUseCase.execute({ name: name, imgFileName: imgFileName, password: password, email: email })];
                    case 2:
                        loginResponse = _b.sent();
                        if (!loginResponse.user)
                            return [2 /*return*/, loginResponse];
                        journalist = new Jornalist_1.Journalist(committeId, loginResponse.user.data.id);
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.journalistsRepository.save(journalist)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, { success: true, msg: "novo jornalista adicionado", user: loginResponse.user, statusCode: HttpResponses_1.HTTP_STATUS_CODES.CREATED }];
                    case 5:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [2 /*return*/, { success: false, msg: "journalista não pôde ser salvo", statusCode: HttpResponses_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SignUpJournalist;
}());
exports.SignUpJournalist = SignUpJournalist;
