import multer from "multer";
import path from "path";

function getUniqueFileName(originalFileName: string) {
  return `${originalFileName.replace(/ /g, '')}`;
}

export const multerUserStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("body: ", req.params)
    callback(null, "./public/assets/users");
  },
  filename: (req, file, callback) => {
    const fileName = getUniqueFileName(file.originalname);
    console.log("filename -->> ", fileName);
    callback(null, fileName);
  },
});

export const multerPostsStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/assets/posts");
  },
  filename: (req, file, callback) => {
    const fileName = getUniqueFileName(file.originalname);
    callback(null, fileName);
  },
});

export const multerCommitteStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/assets/committes");
  },
  filename: (req, file, callback) => {
    const fileName = getUniqueFileName(file.originalname);
    callback(null, fileName);
  },
});

const publicFolder = path.resolve(__dirname, "..", "..", "public");

export const multerStorage = {
  directory: publicFolder,
  storage: multer.diskStorage({
  destination: publicFolder,
  filename: (req, file, callback) => {
    const fileName = getUniqueFileName(file.originalname);
    callback(null, fileName);
  },
})
} 
