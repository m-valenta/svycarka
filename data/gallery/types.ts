export interface IGalleryContentResponse
{
    fileNames: string[];
}

export interface IGalleryStore {
    galleryFiles: string[];
    currentIndex: number;
    loadContent(): void;
}