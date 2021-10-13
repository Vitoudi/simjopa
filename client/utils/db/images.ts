import { API_URL } from "./apiRef";

export function getImageFullPath(imgRef: string) {
  const fullPath = `${API_URL}${!imgRef?.startsWith("/") ? "/" : ""}${imgRef}`;
  console.log("path: ", fullPath)
  return fullPath;
} 

export  function getUserImageFullPath(imgRef: string | undefined) {
    if (!imgRef) return `/assets/user/user-default-icon.png`;
    const fullPath = getImageFullPath(imgRef);
    return fullPath;
}
