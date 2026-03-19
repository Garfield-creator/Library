import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form!: FormGroup;
  error: string | null = null;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submit(): void {

    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.error = null;
    this.loading = true;

    const { username, email, password } = this.form.value;

    this.authService.register(username, email, password).subscribe({
      next: () => {
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
          this.error = "Ett oväntat fel inträffade. Försök igen senare.";
        }
        this.changeDetector.detectChanges();
      }
    });
  }
}

