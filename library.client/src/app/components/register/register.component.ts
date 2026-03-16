import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  onSubmit(): void {
    this.error = null;
    this.loading = true;

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/books']);
      },
      error: (err) => {

        this.loading = false;
        if (err.error?.message) {
          this.error = JSON.stringify(err.error.message);
        } else if (err.error?.errors) {
          const messages = Object.values(err.error.errors)
            .flat()
            .join(' ')
          this.error = messages;
        } else {
          this.error = "Registrering misslyckades. Försök igen senare.";
        }
        this.changeDetector.detectChanges();
      }
    });
  }
}

