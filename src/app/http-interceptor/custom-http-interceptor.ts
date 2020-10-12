import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IAuthenticationService } from '../interfaces/iauthentication-service';
import { INotificationService } from '../interfaces/inotification-service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    public constructor(
        @Inject('IAuthenticationService') private readonly authenticationService: IAuthenticationService,
        @Inject('INotificationService') private readonly notificationService: INotificationService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    switch (error.status) {
                        case 401:
                            this.authenticationService.refreshToken();
                            break;
                        case 403:
                            this.notificationService.notify('You are not authenticated to this operation')
                            break;
                        case 404:
                            this.notificationService.notify('Resource not found');
                            break;

                    }
                    return throwError(error);
                })
            )
    }
}
