import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StatusService } from '../dashboard/statusbar/status.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const statusBar = inject(StatusService);

    if (req.url.includes('/login') || req.url.includes('/register')) {
        return next(req);
    }

    const token = localStorage.getItem('token');
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError(err => {
            if (err.status >= 400 && err.status < 600) {
                statusBar.setMessage(`Error status ${err.status}: ${err.statusText || 'Unknown error'}`);
            }
            return throwError(() => err);
        })
    );
};