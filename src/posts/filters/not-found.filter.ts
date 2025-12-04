import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { time } from 'console';
 @Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        
        response.status(404).json({
            statusCode: 404,
            error: 'Not Found',
            message: exception.message,
            timestamp: new Date().toISOString(),
        });
    }
}