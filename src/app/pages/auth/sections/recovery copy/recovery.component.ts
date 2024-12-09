import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  LoginFormComponent,
  OptionsForm,
} from '../../components/login-form/login-form.component';
import { ACTIONS } from 'src/app/shared/constants/constants';

@Component({
    selector: 'app-recovery',
    imports: [LoginFormComponent, CommonModule],
    template: `<app-login-form [options]="options"></app-login-form>`,
    styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {
  options: OptionsForm = {
    id: ACTIONS.recovery,
    label: ACTIONS.recovery,
  };
}
