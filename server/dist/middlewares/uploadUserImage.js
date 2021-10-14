"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserImage = exports.multerUserStorage = void 0;
var multer_1 = __importDefault(require("multer"));
exports.multerUserStorage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/assets/users");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});
var uploadImg = multer_1.default({ storage: exports.multerUserStorage }).single("profileImg");
function uploadUserImage(req, res, next) {
    var _a;
    console.log("EMAIL: ", (_a = req.fields) === null || _a === void 0 ? void 0 : _a.email);
    req.body = req.fields;
    return uploadImg(req, res, next);
}
exports.uploadUserImage = uploadUserImage;
