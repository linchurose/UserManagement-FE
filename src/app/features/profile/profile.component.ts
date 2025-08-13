import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { UserProfile } from '../../core/models/user-profile.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profile?: UserProfile;
  error = '';

  constructor(private userService: UserService) {}

  loginAndGetProfileData() {
  this.userService.login().pipe(
    switchMap(() => this.userService.getProfileData())
  ).subscribe({
    next: p => { 
      this.profile = p; 
      this.error = ''; 
    },
    error: e => this.error = e.message || 'Login or fetch failed'
  });
}

}
