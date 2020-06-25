import { ArgumentsHost, Catch, ExceptionFilter, HttpException, ConflictException, Next, BadRequestException, NotFoundException } from "@nestjs/common";
import { Request, Response } from 'express';

enum Message {
    MESSAGE_CONFLICT = 'El hidrante ya existe',
    MESSAGE_BAD_REQUEST = 'Datos incorrectos',
    MESSAGE_NOT_FOUND = 'Hidrante no encontrado'
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
        else if (exception instanceof BadRequestException) {
            json = this.getResponseJSON(Message.MESSAGE_BAD_REQUEST);
        }
        else if (exception instanceof NotFoundException) {
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
        }
    }

}