export type DownloadStatus = 'scheduled' | 'available'

export type DownloadFile = {
    name: string,
    device: string,
    path: string,
    status: DownloadStatus
}