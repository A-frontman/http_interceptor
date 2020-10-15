import { HttpClient } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div style="margin: 40px">
      <button (click)="throwError()">Throw Error</button>
      <button (click)="throwHttpError()">Throw Http Error</button>
    </div>
  `
})
@Injectable()
export class AppComponent {
  public constructor(private readonly http: HttpClient) {}

  public throwError(): void {
    throw new Error("");
  }
  public throwHttpError(): void {
    this.http.put("/fake_url", {}).subscribe();
  }
}
