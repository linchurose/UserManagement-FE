import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/register.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
    
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', pathMatch: 'full', redirectTo: 'register' },
    { path: '**', redirectTo: 'register' }
];
