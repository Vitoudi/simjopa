export interface GetPostDto {
    id: number,
    committe: string,
    committeId: number,
    journalist: string,
    journalistId: number,
    imgRef: string | null,
    title: string,
    subtitle: string,
    visitsNumber: number,
    createdAt: string;
}
