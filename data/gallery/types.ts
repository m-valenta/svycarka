export interface IGalleryContentResponse
{
    fileNames: string[];
}

export interface IGalleryStore {
    galleryFiles: string[];
    loadContent(): void;
}