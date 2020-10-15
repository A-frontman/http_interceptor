import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomHttpInterceptor } from "./http-interceptor/custom-http-interceptor";
import { GlobalErrorHandler } from "./error_handler/global-error-handler";
import { ILoggerService } from "./interfaces/ilogger-service";
import { IAuthenticationService } from "./interfaces/iauthentication-service";
import { INotificationService } from "./interfaces/inotification-service";

class EmptyClass
  implements ILoggerService, IAuthenticationService, INotificationService {
  public logError(msg: string): void {
    console.log(`Error is logged: ${msg}`);
  }
  public refreshToken(): void {
    console.log(`Refreshing token started`);
  }
  public notify(msg: string): void {
    window.alert(msg);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule],
  providers: [
    { provide: "ILoggerService", useClass: EmptyClass },
    { provide: "IAuthenticationService", useClass: EmptyClass },
    { provide: "INotificationService", useClass: EmptyClass },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
