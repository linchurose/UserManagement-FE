import { Component } from '@angular/core';
import { RegisterRequest } from '../../core/models/register-request.model';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  reg: RegisterRequest = { username: '', password: '', email: '' };
  message = '';

  constructor(private userService: UserService) {}

  submit() {
    this.userService.register(this.reg).subscribe({
      next: r => this.message = `${r.message} (id=${r.id})`,
      error: e => {
        const err = e?.error;
        // Prefer API fields, then fall back to generic
        this.message =
          err?.title && err?.detail ? `${err.title}: ${err.detail}` :
          err?.title ?? err?.detail ?? e.message ?? 'Registration failed';
      }
    });
  }

}
