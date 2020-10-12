import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './http-interceptor/custom-http-interceptor';
import { GlobalErrorHandler } from './error_handler/global-error-handler';

class EmptyClass {}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    { provide: 'ILoggerService', useClass: EmptyClass },
    { provide: 'IAuthenticationService', useClass: EmptyClass },
    { provide: 'INotificationService', useClass: EmptyClass },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

