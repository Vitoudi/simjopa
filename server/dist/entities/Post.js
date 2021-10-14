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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var GenericEntity_1 = require("./GenericEntity");
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post(htmlContent, journalistId, committeId, imgRef, title, subtitle, visitsNumber, id) {
        var _this = _super.call(this) || this;
        _this.htmlContent = htmlContent;
        _this.journalistId = journalistId;
        _this.committeId = committeId;
        _this.imgRef = imgRef;
        _this.title = title;
        _this.subtitle = subtitle;
        _this.id = id;
        _this.visitsNumber = 0;
        if (visitsNumber)
            _this.visitsNumber = visitsNumber;
        return _this;
    }
    Post.getImgRefForFileName = function (imgFileName) {
        var USERS_IMAGES_PATH = "/assets/posts";
        return imgFileName;
    };
    return Post;
}(GenericEntity_1.GenericEntity));
exports.Post = Post;
