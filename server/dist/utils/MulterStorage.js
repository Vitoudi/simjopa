"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerStorage = exports.multerCommitteStorage = exports.multerPostsStorage = exports.multerUserStorage = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
function getUniqueFileName(originalFileName) {
    return "" + originalFileName.replace(/ /g, '');
}
exports.multerUserStorage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        console.log("body: ", req.params);
        callback(null, "./public/assets/users");
    },
    filename: function (req, file, callback) {
        var fileName = getUniqueFileName(file.originalname);
        console.log("filename -->> ", fileName);
        callback(null, fileName);
    },
});
exports.multerPostsStorage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/assets/posts");
    },
    filename: function (req, file, callback) {
        var fileName = getUniqueFileName(file.originalname);
        callback(null, fileName);
    },
});
exports.multerCommitteStorage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/assets/committes");
    },
    filename: function (req, file, callback) {
        var fileName = getUniqueFileName(file.originalname);
        callback(null, fileName);
    },
});
var publicFolder = path_1.default.resolve(__dirname, "..", "..", "public");
exports.multerStorage = {
    directory: publicFolder,
    storage: multer_1.default.diskStorage({
        destination: publicFolder,
        filename: function (req, file, callback) {
            var fileName = getUniqueFileName(file.originalname);
            callback(null, fileName);
        },
    })
};
