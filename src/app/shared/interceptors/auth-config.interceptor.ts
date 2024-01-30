import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

@Injectable()
export class AuthConfigInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('access-token');

    if (accessToken) {
      if (this.isTokenExpired()) {
        window.alert('Current session has been expired. Please,Sign Out and Sign In again.');

        //this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Current session has been expired. Please, Sign In again.' });
      } else {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return next.handle(cloned).pipe(
          catchError((error) => {
            if (error.status === 401) {
              window.alert('Current session has been expired. Please,Sign Out and Sign In again.');
              this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Current session has been expired. Please, Sign In again.' });
            }
            return throwError(error);
          })
        );
      }
    }

    return next.handle(req);
  }



  private isTokenExpired(): boolean {
    const accessToken = sessionStorage.getItem('access-token');

    if (accessToken) {
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expirationDate = new Date(payload.exp * 1000);
        const currentDate = new Date();

        return expirationDate <= currentDate;
      } catch (error) {
        // Handle parsing error (invalid token format)
        console.error('Error parsing token:', error);
        return true;
      }
    }

    return true; // Token is considered expired if not present
  }
}