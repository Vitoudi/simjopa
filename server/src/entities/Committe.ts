import { GenericEntity } from "./GenericEntity";

export class Committe extends GenericEntity {

    constructor(
        public name: string,
        public imgRef: string,
        public readonly id?: number 
    ) {
        super();
    }
}