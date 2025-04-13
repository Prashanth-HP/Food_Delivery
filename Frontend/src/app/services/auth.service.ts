import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { tap,delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private loggedIn = new BehaviorSubject<boolean>(false);
  
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
    console.log(`Attempting login with email: ${email}`); // For debugging
    
    // Check if the provided credentials match the hardcoded ones
    if (email === this.correctEmail && password === this.correctPassword) {
      // Login successful
      console.log('Login successful');
      // Return a successful result wrapped in an Observable using 'of'
      return of({ success: true }).pipe(
        delay(500), // Simulate network delay
        tap(() => { // Side effect after successful emission
          // Store login status in localStorage
          localStorage.setItem(this.loggedInKey, 'true');
          // Notify subscribers that the user is logged in
          this.loggedInStatus.next(true);
          console.log('Login status updated and token set.');
        })
      );
    } else {
      // Login failed
      console.log('Login failed: Invalid credentials');
      // Return a failed result with an error message, wrapped in an Observable
      // Optionally add a small delay
      return of({ success: false, message: 'Invalid email or password.' }).pipe(delay(500));
    }
  }

  // Optional: Add a simple logout method if needed later
  logout(): void {
    console.log('Logging out user.');
    // Remove the flag from localStorage
    localStorage.removeItem(this.loggedInKey);
    // Notify subscribers that the user is logged out
    this.loggedInStatus.next(false);
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

    isLoggedIn(): boolean {
      return this.loggedInStatus.value; // Get the current value
    }
}
