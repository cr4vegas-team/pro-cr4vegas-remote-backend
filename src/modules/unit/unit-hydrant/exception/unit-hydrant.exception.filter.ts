import { ArgumentsHost, Catch, ExceptionFilter, HttpException, ConflictException, Next, BadRequestException, NotFoundException } from "@nestjs/common";
import { Request, Response } from 'express';

enum Message {
    MESSAGE_CONFLICT = 'El código de hidrante ya existe y no se agregó',
    MESSAGE_BAD_REQUEST = 'Los datos enviados son incorrectos',
    MESSAGE_NOT_FOUND = 'El hidrante a actualizar no existe'
}

@Catch(HttpException)
export class UnitHydrantExceptionFilter implements ExceptionFilter {

    private request: Request;
    private exception: HttpException;

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        this.exception = exception;
        this.request = ctx.getRequest<Request>();

        var json = this.getResponseJSON(exception.message);

        if (exception instanceof ConflictException) {
            json = this.getResponseJSON(Message.MESSAGE_CONFLICT);
        }
        if (exception instanceof BadRequestException) {
            json = this.getResponseJSON(Message.MESSAGE_BAD_REQUEST);
        }
        if (exception instanceof NotFoundException) {
            json = this.getResponseJSON(Message.MESSAGE_NOT_FOUND);
        }
        response.json(json);
    }

    getResponseJSON(message: Message): {} {
        return {
            statusCode: this.exception.getStatus(),
            timestamp: new Date().toISOString(),
            path: this.request.url,
            message,
            data: this.exception.getResponse()['data'],
            required: this.exception.getResponse()['required']
        }
    }

}