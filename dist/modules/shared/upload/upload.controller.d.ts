import { Response } from 'express';
export declare const imageJPGFileFilter: (req: any, file: any, callback: any) => void;
export declare const imageJPGLimits: {
    fileSize: number;
    files: number;
};
export declare class UploadController {
    uploadImage(file: any): any;
    getImage(filename: any, res: Response): void;
}
