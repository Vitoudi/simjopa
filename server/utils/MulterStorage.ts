import multer from "multer";

function getUniqueFileName(originalFileName: string) {
  return `${Date.now()}-${originalFileName}`;
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
