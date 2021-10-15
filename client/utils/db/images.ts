import { API_URL } from "./apiRef";

function constructImgPath(bucket: string, imgRef: string) {
  const imgPath = `https://sinuma-${bucket}.s3.amazonaws.com/${imgRef}`;
  console.log("path: ", imgPath);
  return imgPath;
}

export  function getUserImageFullPath(imgRef: string | undefined) {
    if (!imgRef) return `/assets/user/user-default-icon.png`;
    const fullPath = constructImgPath("users", imgRef);
    return fullPath;
}

export function getPostImageFullPath(imgRef: string | undefined) {
  if (!imgRef) return `/assets/post/post-default-icon.png`;
  const fullPath = constructImgPath("posts", imgRef);
  return fullPath;
}

export function getCommitteeImageFullPath(imgRef: string | undefined) {
  if (!imgRef) return `/assets/committee/committee-default-icon.png`;
  const fullPath = constructImgPath("committes", imgRef);
  return fullPath;
}
