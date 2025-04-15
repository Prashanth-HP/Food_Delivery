import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { tap,delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly correctEmail = 'admin@quickbite.com';
  private readonly correctPassword = 'Admin123';

  private readonly loggedInKey = 'isQuickBiteLoggedIn';

  private loggedInStatus = new BehaviorSubject<boolean>(this.hasLoginToken());

  isLoggedIn$: Observable<boolean> = this.loggedInStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasLoginToken(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }

  login(email: string, password: string): Observable<{ success: boolean; message?: string }> {
    console.log(`Attempting login with email: ${email}`); 

    if (email === this.correctEmail && password === this.correctPassword) {

      console.log('Login successful');

      return of({ success: true }).pipe(
        delay(500), 
        tap(() => { 

          localStorage.setItem(this.loggedInKey, 'true');

          this.loggedInStatus.next(true);
          console.log('Login status updated and token set.');
        })
      );
    } else {

      console.log('Login failed: Invalid credentials');

      return of({ success: false, message: 'Invalid email or password.' }).pipe(delay(500));
    }
  }

  logout(): void {
    console.log('Logging out user.');

    localStorage.removeItem(this.loggedInKey);

    this.loggedInStatus.next(false);

    this.router.navigate(['/login']);
  }

    isLoggedIn(): boolean {
      return this.loggedInStatus.value; 
    }
}
