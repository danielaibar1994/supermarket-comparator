import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  LoginFormComponent,
  OptionsForm,
} from '../../components/login-form/login-form.component';
import { ACTIONS } from 'src/app/shared/constants/constants';

@Component({
    selector: 'app-sign-in',
    imports: [LoginFormComponent, CommonModule],
    template: `<app-login-form [options]="options"></app-login-form>`,
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  options: OptionsForm = {
    id: ACTIONS.signIn,
    label: ACTIONS.signIn,
  };
}
