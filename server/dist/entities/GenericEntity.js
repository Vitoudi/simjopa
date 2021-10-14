"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEntity = void 0;
var GenericEntity = /** @class */ (function () {
    function GenericEntity() {
    }
    GenericEntity.prototype.toObjectWithoutUndefinedValues = function () {
        var newObj = {};
        Object.entries(this).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value === undefined)
                return;
            newObj[key] = value;
        });
        return newObj;
    };
    return GenericEntity;
}());
exports.GenericEntity = GenericEntity;
