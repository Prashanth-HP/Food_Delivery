import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', { email, password }).pipe(
      tap((res) => {
        if (res.success) {
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}
