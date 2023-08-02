import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null)
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient,
        private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBS9Uf9X431lRm0GIdkmH6JWIqCiSTXYI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.onHandleError), tap(resData => {
                this.handleAuthentication(resData.email,
                    resData.idToken,
                    resData.localId,
                    +resData.expiresIn)
            }

            ))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBS9Uf9X431lRm0GIdkmH6JWIqCiSTXYI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.onHandleError), tap(resData => {
                this.handleAuthentication(resData.email,
                    resData.idToken,
                    resData.localId,
                    +resData.expiresIn)
            }

            ))
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth'])

        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    autologout(expirationDuration: number) {
     this.tokenExpirationTimer =  setTimeout(() => {
            this.logout();

        }, expirationDuration)
      
    }
    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpiration: string
        } = JSON.parse(localStorage.getItem('userData'))
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpiration))

        if (loadedUser.token) {

            this.user.next(loadedUser);

            
        }
        // const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
        //     console.log(expirationDuration)
        //     this.autologout(expirationDuration)
    }

    private handleAuthentication(email: string, token: string, userId: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
            email,
            userId,
            token,
            expirationDate)
        this.user.next(user)
        localStorage.setItem('userData', JSON.stringify(user))
        this.autologout(expiresIn*1000)
    }

    private onHandleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occur !'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exists';
                break;
            case ' OPERATION_NOT_ALLOWED':
                errorMessage = ' Password sign-in is disabled for this project'
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not valid';
                break;
        }
        return throwError(errorMessage)
    }
}