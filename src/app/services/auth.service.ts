import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlReg = 'http://localhost/portfolio/back-end/register.php';
  private apiUrlLogin = 'http://localhost/portfolio/back-end/login.php';
  
  // login status
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) { }

  // check login status
  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  // send data to backend for managing the registration
  registerUser(userData: { firstName: string; lastName: string; email: string; password: string; repass: string }): Observable<any> {
    return this.http.post<any>(this.apiUrlReg, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true // Aggiungi questo!
    });
  }

  //send data to backen for login script and get a response
  loginUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrlLogin, userData, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(
      tap(response => {
        if (response.message === 'Login successful') {
          if (response.user_id) {
            localStorage.setItem('userId', response.user_id.toString());
            console.log('User ID saved to localStorage:', response.user_id);
            this.loggedIn.next(true); 
            this.router.navigate(['/home']);
          } else {
            console.error('user_id not found in response');
          }
        } else {
          console.error('Login not successful:', response.message);
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }
  isLoggedIn(): boolean {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      // Try to retrieve the 'userId' from localStorage
      const userId = localStorage.getItem('userId');
      // Return true if userId exists, otherwise false (indicates login status)
      return !!userId;
    }
    // If localStorage is not available, return false (user is not logged in)
    return false;
  }
  

  //logout and navigate user to login page
  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('userId');
      this.loggedIn.next(false);
    }
    this.router.navigate(['/login']);
  }
}
