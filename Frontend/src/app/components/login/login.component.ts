import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,   private toastr: ToastrService) {}

  loginUser() {
    this.authService.login(this.email, this.password).subscribe(
      (res: any) => {
        if (res.success) {
          this.router.navigate(['/']);
          this.toastr.success(`Enjoy your time ordering!`, 'Login Successful!', {
            timeOut: 2000, 
            closeButton: true, 
            progressBar: true, 
          });
        } else {
          this.errorMessage = res.message;
        }
      },
      (err: any) => {
        this.errorMessage = 'Login failed.';
      }
    );
  }
}
