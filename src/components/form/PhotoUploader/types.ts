export interface IPhotoUploader {
    limit?: number
    name: string
    onChange?: (files: FileList | null) => void
}