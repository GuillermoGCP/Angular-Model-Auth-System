import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../../models/Login';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { enviroment } from '../../../../enviroment.dev';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../../models/LoginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private apiCallService: ApiCallService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  loginForm: FormGroup = new FormGroup('');
  private subscription: Subscription = new Subscription();
  backUrl = enviroment.apiUrl;
  options: Login = { body: { email: '', password: '' } };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    try {
      this.options.body = this.loginForm.value;
      const loginSubscription = this.apiCallService
        .makeApiCall<LoginResponse>(
          this.backUrl + 'login',
          'POST',
          this.options
        )
        .subscribe(
          (data) => {
            this.toastr.success(
              '¡Enorabuena! Has iniciado sesión correctamente'
            );
            this.options.body.email = '';
            this.options.body.password = '';
            this.authService.saveToken(data.data.token);
          },
          (err) => {
            console.log(err);
            this.toastr.error(err.error.error);
          }
        );
      this.subscription.add(loginSubscription);
    } catch (err: any) {
      this.toastr.error(err);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
