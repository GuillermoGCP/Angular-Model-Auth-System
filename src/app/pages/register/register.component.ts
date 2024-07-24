import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register } from '../../../models/Register';
import { enviroment } from '../../../../enviroment.dev';
import { ButtonComponent } from '../../components/button/button.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiCallService } from '../../services/api-call.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ButtonComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  constructor(
    private toastr: ToastrService,
    private apiCallService: ApiCallService
  ) {}

  private subscription = new Subscription();
  options: Register = { body: { name: '', email: '', password: '' } };

  backUrl = enviroment.apiUrl;

  registerHandler($event: SubmitEvent): void {
    $event?.preventDefault();

    const registerSubscription = this.apiCallService
      .makeApiCall(this.backUrl + 'register', 'POST', this.options)
      .subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('¡Enorabuena! Te has registrado correctamente');
          this.options.body.name = '';
          this.options.body.email = '';
          this.options.body.password = '';
        },
        (err) => {
          this.toastr.error(err.error.error || err.error);
          console.log(err);
        }
      );

    this.subscription.add(registerSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
