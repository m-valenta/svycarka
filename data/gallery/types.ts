export interface IGalleryContentResponse
{
    fileNames: string[];
}

export interface IGalleryStore {
    readonly galleryFiles: string[];
    readonly isLoading: boolean;
    currentIndex: number;
    loadContent(): void;
}