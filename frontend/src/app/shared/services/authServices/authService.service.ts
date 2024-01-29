import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SnackbarServices } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.REST_API_URL}`;
  private _authenticated: boolean = false;
  tokenDetails: any;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private snackbarService: SnackbarServices
  ) {
    this.initAuthentication();

    // let tokenDetailsString = localStorage.getItem('tokenDetails');
    // if (tokenDetailsString !== null) {
    //   this.tokenDetails = JSON.parse(tokenDetailsString);
    //   // Convert the string to a Date object
    //   this.tokenDetails.exp_date = new Date(this.tokenDetails.exp_date);
    // }
    // if (
    //   localStorage.getItem('accessToken') != null &&
    //   this.tokenDetails.exp_date < new Date()
    // ) {
    //   this._authenticated = true;
    // }
  }

  private initAuthentication() {
    let tokenDetailsString = localStorage.getItem('tokenDetails');
    if (tokenDetailsString !== null) {
      this.tokenDetails = JSON.parse(tokenDetailsString);
      // Convert the string to a Date object
      this.tokenDetails.exp_date = new Date(this.tokenDetails.exp_date);

      if (this.tokenDetails.exp_date < new Date()) {
        // Token is not valid, clear localStorage and set authenticated to false
        localStorage.clear();
        this._authenticated = false;
        this._router.navigate(['/login']);
      } else {
        // Token is valid, set authenticated to true
        this._authenticated = true;
      }
    }
  }
  
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  login(params: any) {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this.http.post(`${this.apiUrl}/auth/login`, params).pipe(
      switchMap((response: any) => {
        if (response) {
          localStorage.setItem('tokenDetails', JSON.stringify(response));

          // Store the access token in the local storage
          this.accessToken = response.jwtToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Return a new observable with the response
          return of(response);
        } else {
          return of(response);
        }
      }),
      catchError((e) => {
        this.snackbarService.errorsSnack(e.error.message);
        return of();
      })
    );
  }

  signUp(user_data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, user_data);
  }

  isAuthenticatedUser(): boolean {
    return this._authenticated;
  }

  logout(): Observable<any> {
    localStorage.clear();
    this._authenticated = false;

    // Return the observable
    return of(true);
  }
}
