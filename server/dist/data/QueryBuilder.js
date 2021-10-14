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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
var db_1 = require("./db");
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        this.query = "";
        this.params = [];
    }
    QueryBuilder.prototype.select = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.addQueryFragment("SELECT " + values.join(", "));
        return this;
    };
    QueryBuilder.prototype.from = function (tableName) {
        this.addQueryFragment("FROM " + tableName);
        return this;
    };
    QueryBuilder.prototype.where = function (value, operator, secretValue) {
        this.addConditionClause("WHERE", value, operator, secretValue);
        return this;
    };
    QueryBuilder.prototype.and = function (value, operator, secretValue) {
        this.addConditionClause("WHERE", value, operator, secretValue);
        return this;
    };
    QueryBuilder.prototype.or = function (value, operator, secretValue) {
        this.addConditionClause("OR", value, operator, secretValue);
        return this;
    };
    QueryBuilder.prototype.insertInto = function (tableName, values) {
        var keys = [];
        var valuesArr = [];
        for (var prop in values) {
            keys.push(prop);
            valuesArr.push(values[prop]);
        }
        this.params = __spreadArray(__spreadArray([], this.params), valuesArr);
        var placeholders = this.getPlaceholders(keys.length);
        this.addQueryFragment("INSERT INTO " + tableName + " (" + keys.join(", ") + ") VALUES (" + placeholders + ")");
        return this;
    };
    QueryBuilder.prototype.join = function (tableName, joinType) {
        this.addQueryFragment((joinType ? joinType + " " : "") + "JOIN " + tableName);
        return this;
    };
    QueryBuilder.prototype.on = function (value, operator, secondValue) {
        this.addQueryFragment("ON " + value + " " + operator + " " + secondValue);
        return this;
    };
    QueryBuilder.prototype.limit = function (num, endPosition) {
        this.addQueryFragment("LIMIT " + num + (endPosition ? ", " + endPosition : ""));
        return this;
    };
    QueryBuilder.prototype.update = function (tableName) {
        this.addQueryFragment("UPDATE " + tableName);
        return this;
    };
    QueryBuilder.prototype.deleteFrom = function (tableName) {
        this.addQueryFragment("DELETE FROM " + tableName);
        return this;
    };
    QueryBuilder.prototype.set = function (values) {
        var formattedValues = [];
        for (var prop in values) {
            var value = values[prop];
            if (value === undefined)
                continue;
            this.params.push(value);
            formattedValues.push(prop + " = ?");
        }
        var formattedValuesStr = formattedValues.join(", ");
        this.addQueryFragment("SET " + formattedValuesStr);
        return this;
    };
    QueryBuilder.prototype.orderBy = function (_a) {
        var field = _a.field, sortingType = _a.sortingType;
        this.addQueryFragment("ORDER BY " + field + " " + sortingType);
        return this;
    };
    QueryBuilder.prototype.getAsText = function () {
        var queryText = this.getFormattedQuery();
        this.cleanQuery();
        return queryText;
    };
    QueryBuilder.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getFormattedQuery();
                        params = Object.freeze(this.params);
                        this.logQuery();
                        this.cleanQuery();
                        return [4 /*yield*/, db_1.db.execute(query, params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    QueryBuilder.prototype.getAsQueryResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, params, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.getFormattedQuery();
                        params = Object.freeze(this.params);
                        this.logQuery();
                        this.cleanQuery();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.db.execute(query, params)];
                    case 2:
                        data = (_a.sent())[0];
                        return [2 /*return*/, data];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        throw new Error("invalid query");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    QueryBuilder.prototype.getAsDto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryAsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAsQueryResponse()];
                    case 1:
                        queryAsResponse = (_a.sent());
                        return [2 /*return*/, queryAsResponse];
                }
            });
        });
    };
    QueryBuilder.prototype.addQueryFragment = function (fragment) {
        this.query += fragment + " ";
    };
    QueryBuilder.prototype.addConditionClause = function (conditionClause, value, operator, secretValue) {
        var thereIsAWhereClauseInCurrentQuery = this.query.includes("WHERE");
        var keyword = thereIsAWhereClauseInCurrentQuery
            ? conditionClause
            : "WHERE";
        this.addQueryFragment(keyword + " " + value + " " + operator + " ?");
        this.params.push(secretValue);
    };
    QueryBuilder.prototype.logQuery = function () {
        console.log("🖥 EXECUTING -> ", this.getFormattedQuery());
        console.log("params: ", this.params);
    };
    QueryBuilder.prototype.getFormattedQuery = function () {
        return this.query.trim() + ";";
    };
    QueryBuilder.prototype.cleanQuery = function () {
        this.query = "";
        this.params = [];
    };
    QueryBuilder.prototype.getPlaceholders = function (quantity) {
        var placeHolders = [];
        placeHolders.length = quantity;
        placeHolders.fill("?");
        return placeHolders.join(", ");
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
