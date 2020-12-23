/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';

// ==================================================

export const imageJPGFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
    callback(
      new BadRequestException('Solo se permiten imagenes en JPG'),
      false,
    );
  }
  callback(null, true);
};

// ==================================================

export const imageJPGLimits = {
  fileSize: 5000000,
  files: 1,
};

// ==================================================

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'upload/images',
      fileFilter: imageJPGFileFilter,
      limits: imageJPGLimits,
    }),
  )
  uploadImage(@UploadedFile() file): any {
    if (!file) {
      throw new BadRequestException('Se require una imagen en formato .jpg');
    }
    return { filename: file.filename };
  }

  // ==================================================

  @Get('image')
  getImage(@Query('filename') filename, @Res() res: Response) {
    if (fs.existsSync('./upload/images/' + filename)) {
      return res.sendFile(filename, { root: './upload/images' });
    } else {
      throw new NotFoundException('La imagen no existe. Vuelva a cargar una');
    }
  }
}
