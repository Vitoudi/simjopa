"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.MySqlPostsRepository = void 0;
var Repository_1 = require("../Repository");
var MySqlPostsRepository = /** @class */ (function (_super) {
    __extends(MySqlPostsRepository, _super);
    function MySqlPostsRepository(queryBuilder) {
        var _this = _super.call(this, "posts") || this;
        _this.queryBuilder = queryBuilder;
        return _this;
    }
    Object.defineProperty(MySqlPostsRepository.prototype, "getAllQuery", {
        get: function () {
            return this.queryBuilder
                .select(this.tableName + ".htmlContent", this.tableName + ".imgRef", this.tableName + ".id", this.tableName + ".title", this.tableName + ".subtitle", this.tableName + ".visitsNumber", this.tableName + ".createdAt", "journalists.id AS journalistId", "committes.name AS committe", "committes.id AS committeId")
                .from(this.tableName)
                .join("journalists", "LEFT")
                .on("journalists.id", "=", this.tableName + ".journalistId")
                .join("committes", "LEFT")
                .on("committes.id", "=", this.tableName + ".committeId");
        },
        enumerable: false,
        configurable: true
    });
    MySqlPostsRepository.prototype.getPosts = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getAllQuery;
                        query = this.addOptionsToGetRepositoryDataToQuery(query, __assign(__assign({}, options), { searchField: "title" }));
                        return [4 /*yield*/, query.getAsDto()];
                    case 1:
                        posts = _a.sent();
                        return [2 /*return*/, posts];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.createPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var postWithoutUndefinedValues, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postWithoutUndefinedValues = post.toObjectWithoutUndefinedValues();
                        query = this.queryBuilder.insertInto(this.tableName, postWithoutUndefinedValues);
                        return [4 /*yield*/, query.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.deletePost = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryBuilder
                            .deleteFrom(this.tableName)
                            .where("id", "=", id.toString());
                        return [4 /*yield*/, query.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.getPostById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, posts, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getAllQuery.where(this.tableName + ".id", "=", id.toString());
                        return [4 /*yield*/, query.getAsDto()];
                    case 1:
                        posts = _a.sent();
                        post = posts[0];
                        return [2 /*return*/, post];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.getPostsByCommittee = function (committeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPostsBy("committeId", committeeId)];
                    case 1:
                        posts = _a.sent();
                        return [2 /*return*/, posts];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.getPostsByJournalist = function (journalistId) {
        return __awaiter(this, void 0, void 0, function () {
            var posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPostsBy("journalistId", journalistId)];
                    case 1:
                        posts = _a.sent();
                        return [2 /*return*/, posts];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.updatePost = function (postId, values) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.queryBuilder
                            .update(this.tableName)
                            .set(values)
                            .where("id", "=", postId.toString());
                        return [4 /*yield*/, query.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MySqlPostsRepository.prototype.searchPostsByTitle = function (titleFragment) {
        return __awaiter(this, void 0, void 0, function () {
            var query, results;
            return __generator(this, function (_a) {
                query = this.getAllQuery.where("title", "LIKE", "%" + titleFragment + "%");
                results = query.getAsDto();
                return [2 /*return*/, results || []];
            });
        });
    };
    MySqlPostsRepository.prototype.getPostsBy = function (columnName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getAllQuery.where(columnName, "=", id.toString());
                        return [4 /*yield*/, query.getAsDto()];
                    case 1:
                        posts = _a.sent();
                        return [2 /*return*/, posts || []];
                }
            });
        });
    };
    return MySqlPostsRepository;
}(Repository_1.Repository));
exports.MySqlPostsRepository = MySqlPostsRepository;
