export interface CreatePostDto {
    htmlContent: string,
    committeId: number,
    journalistId: number,
    imgRef: string | null,
    title: string
    subtitle: string
}