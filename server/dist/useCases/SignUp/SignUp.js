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
exports.SignUp = void 0;
var User_1 = require("../../entities/User");
var HttpResponses_1 = require("../../utils/HttpResponses");
var SignUp = /** @class */ (function () {
    function SignUp(usersRepository, emailsRepository, passwordEncryptor, loginUseCase) {
        this.usersRepository = usersRepository;
        this.emailsRepository = emailsRepository;
        this.passwordEncryptor = passwordEncryptor;
        this.loginUseCase = loginUseCase;
    }
    SignUp.prototype.execute = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, userAlreadyExits, user, res, loginResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = createUserDto.email, password = createUserDto.password;
                        return [4 /*yield*/, this.checkIfUserAlreadyExists(email)];
                    case 1:
                        userAlreadyExits = _a.sent();
                        if (userAlreadyExits)
                            return [2 /*return*/, {
                                    success: false,
                                    msg: "O úsuario já existe",
                                    statusCode: HttpResponses_1.HTTP_STATUS_CODES.UNAUTHORIZED,
                                }];
                        return [4 /*yield*/, this.createUser(createUserDto)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.usersRepository.saveUser(user)];
                    case 3:
                        res = _a.sent();
                        user.id = res.insertId;
                        return [4 /*yield*/, this.loginUseCase.execute(email, password)];
                    case 4:
                        loginResponse = _a.sent();
                        return [2 /*return*/, loginResponse];
                }
            });
        });
    };
    SignUp.prototype.getImgRefFor = function (imgFileName) {
        return __awaiter(this, void 0, void 0, function () {
            var USERS_IMAGES_PATH;
            return __generator(this, function (_a) {
                USERS_IMAGES_PATH = "/assets/users";
                return [2 /*return*/, USERS_IMAGES_PATH + "/" + imgFileName];
            });
        });
    };
    SignUp.prototype.createUser = function (_a) {
        var password = _a.password, imgFileName = _a.imgFileName, name = _a.name, email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var role, hashPassword, imgRef, _b, user;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getUserRole(email)];
                    case 1:
                        role = _c.sent();
                        return [4 /*yield*/, this.passwordEncryptor.encrypt(password)];
                    case 2:
                        hashPassword = _c.sent();
                        if (!imgFileName) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getImgRefFor(imgFileName)];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _b = null;
                        _c.label = 5;
                    case 5:
                        imgRef = _b;
                        user = new User_1.User(name, email, hashPassword, role, imgRef);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    SignUp.prototype.getUserRole = function (email) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var emailInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.emailsRepository.getEmailInfo(email)];
                    case 1:
                        emailInfo = _b.sent();
                        return [2 /*return*/, (_a = emailInfo === null || emailInfo === void 0 ? void 0 : emailInfo.roleId) !== null && _a !== void 0 ? _a : User_1.UserRole.USER];
                }
            });
        });
    };
    SignUp.prototype.checkIfUserAlreadyExists = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.getUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, Boolean(user)];
                }
            });
        });
    };
    return SignUp;
}());
exports.SignUp = SignUp;
