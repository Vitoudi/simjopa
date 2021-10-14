"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommitte = void 0;
var GetCommitte = /** @class */ (function () {
    function GetCommitte(committesRepository) {
        this.committesRepository = committesRepository;
    }
    GetCommitte.prototype.execute = function (id) {
        var committe = this.committesRepository.getById(id);
        return committe;
    };
    return GetCommitte;
}());
exports.GetCommitte = GetCommitte;
