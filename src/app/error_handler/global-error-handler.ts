import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { ILoggerService } from '../interfaces/ilogger-service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
    public constructor(
        @Inject('ILoggerService') private readonly loggerService: ILoggerService
    ) {
        super();
    }
    public handleError(error: any): void {
        super.handleError(error)

        if (error instanceof HttpErrorResponse) {
            this.loggerService.logError(`Http error received with code: ${error.status}`)
        } else {
            this.loggerService.logError(`Client - side error received`)
        }
    }
}