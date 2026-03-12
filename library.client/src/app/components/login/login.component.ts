import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  onSubmit(): void {
    this.error = null;
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/books']);
        this.cdr.detectChanges();
      },
      error: err => {
        this.loading = false;
        if (err.status === 401) {
          this.error = 'Invalid username or password.';
        } else if (err.status === 0) {
          this.error = 'Unable to reach server. Please check your connection.';
        } else {
          this.error = 'An unexpected error occurred while logging in.';
        }
        console.error('Login error', err);
        // Make sure the view updates and show a visible popup
        this.cdr.detectChanges();
      }
    });
  }
}

