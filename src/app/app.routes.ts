import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { title: 'Registro', path: 'register', component: RegisterComponent },
  { title: 'Login', path: 'login', component: LoginComponent },
];
