import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const multerUserStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/assets/users");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});


const uploadImg = multer({ storage: multerUserStorage }).single("profileImg");

export function uploadUserImage(
  req: Request<{}, any, any, Record<string, any>>,
  res: Response,
  next: NextFunction
) {
  console.log("EMAIL: ", req.fields?.email);
  req.body = req.fields;

  return uploadImg(req, res, next);
}
