import { ArgumentsHost, Catch, ExceptionFilter, HttpException, ConflictException, Next, BadRequestException, NotFoundException } from "@nestjs/common";
import { Request, Response } from 'express';

enum Message {
    MESSAGE_CONFLICT = 'El código de la unidad ya existe',
    MESSAGE_BAD_REQUEST = 'Los datos enviados son incorrectos',
    MESSAGE_NOT_FOUND = 'No se encontró ninguna unidad'
}

@Catch(HttpException)
export class UnitExceptionFilter implements ExceptionFilter {

    private request: Request;
    private exception: HttpException;

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        this.exception = exception;
        this.request = ctx.getRequest<Request>();

        let json = this.getResponseJSON(exception.message);

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
        }
    }

}