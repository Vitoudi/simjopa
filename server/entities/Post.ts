import { GenericEntity } from "./GenericEntity";

export class Post extends GenericEntity {
  public visitsNumber = 0;

  constructor(
    public htmlContent: string,
    public journalistId: number,
    public committeId: number,
    public imgRef: string | null,
    public title: string,
    public subtitle: string,
    visitsNumber?: number,
    public readonly id?: number
  ) {
    super();
    if (visitsNumber) this.visitsNumber = visitsNumber;
  }

  public static getImgRefForFileName(imgFileName: string) {
    const USERS_IMAGES_PATH = "/assets/posts";

    return imgFileName;
  }
}
