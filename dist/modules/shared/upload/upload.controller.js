"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = exports.imageJPGLimits = exports.imageJPGFileFilter = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
exports.imageJPGFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
        callback(new common_1.BadRequestException('Solo se permiten imagenes en JPG'), false);
    }
    callback(null, true);
};
exports.imageJPGLimits = {
    fileSize: 5000000,
    files: 1,
};
let UploadController = class UploadController {
    uploadImage(file) {
        if (!file) {
            throw new common_1.BadRequestException('Se require una imagen en formato .jpg');
        }
        return { filename: file.filename };
    }
    getImage(filename, res) {
        if (fs.existsSync('./upload/images/' + filename)) {
            return res.sendFile(filename, { root: './upload/images' });
        }
        else {
            throw new common_1.NotFoundException('La imagen no existe. Vuelva a cargar una');
        }
    }
};
__decorate([
    common_1.Post('image'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        dest: 'upload/images',
        fileFilter: exports.imageJPGFileFilter,
        limits: exports.imageJPGLimits,
    })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UploadController.prototype, "uploadImage", null);
__decorate([
    common_1.Get('image'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Query('filename')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "getImage", null);
UploadController = __decorate([
    common_1.Controller('upload')
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map