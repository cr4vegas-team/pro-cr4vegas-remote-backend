import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
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
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';

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

@UseGuards(JwtAuthGuard, UserRoleGuard)
@Controller('upload')
export class UploadController {

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
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

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get('image')
  getImage(@Query('filename') filename, @Res() res: Response) {
    if (fs.existsSync('./upload/images/' + filename)) {
      return res.sendFile(filename, { root: './upload/images' });
    } else {
      throw new NotFoundException('La imagen no existe. Vuelva a cargar una');
    }
  }
}
