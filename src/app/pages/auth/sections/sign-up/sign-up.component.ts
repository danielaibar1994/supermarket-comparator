import { Component } from '@angular/core';
import {
  LoginFormComponent,
  OptionsForm,
} from '../../components/login-form/login-form.component';
import { ACTIONS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [LoginFormComponent],
  template: `<app-login-form [options]="options"></app-login-form>`,
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  options: OptionsForm = {
    id: ACTIONS.signUp,
    label: ACTIONS.signUp,
  };
}
