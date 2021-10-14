"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var Repository = /** @class */ (function () {
    function Repository(tableName) {
        this.tableName = tableName;
    }
    Repository.prototype.addOptionsToGetRepositoryDataToQuery = function (query, _a) {
        var searchFragment = _a.searchFragment, whereClAuses = _a.whereClAuses, orderByOptions = _a.orderByOptions, limit = _a.limit, page = _a.page, searchField = _a.searchField;
        if (searchFragment)
            query.where(searchField, "LIKE", "%" + searchFragment + "%");
        console.log("where clauses: ", whereClAuses);
        for (var clauseKey in whereClAuses) {
            var value = whereClAuses[clauseKey];
            if (!value)
                continue;
            query.and(this.tableName + "." + clauseKey, "=", value);
        }
        if (orderByOptions)
            query.orderBy(orderByOptions);
        if (limit && page) {
            var offset = limit * (page - 1);
            query.limit(offset, limit);
        }
        return query;
    };
    return Repository;
}());
exports.Repository = Repository;
