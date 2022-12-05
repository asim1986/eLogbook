export interface IFileInputType {
  file: null;
  type: string;
}

export interface IFileType {
  id: string;
  file: null;
  type: string;
  actId?: string;
}

export interface IUploadFile {
  imageUrl: string;
  status: number;
  message: string;
}
