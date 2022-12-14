import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../services/api-service/api-service.service';
import { getLocalItem } from 'src/utils/localstorage';
import { ENUMS } from 'src/utils/enums';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private api: ApiServiceService) {}
  token: any = getLocalItem(ENUMS.USERDATA)?.data?.accessToken;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` },
      });
    }
    return new Observable((observer) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            observer.next(event);
          }
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
