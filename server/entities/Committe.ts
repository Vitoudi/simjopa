import { GenericEntity } from "./GenericEntity";

export class Committe extends GenericEntity {
    public imgRef: string;

    constructor(
        public name: string,
        imgRef: string,
        public readonly id?: number 
    ) {
        super();
        this.imgRef = Committe.getImgRefForFileName(imgRef);
    }

    public static getImgRefForFileName(imgFileName: string) {
        const path = "/assets/committes";

        return `${path}/${imgFileName}`;
    }
}