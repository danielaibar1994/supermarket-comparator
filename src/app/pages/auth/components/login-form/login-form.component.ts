import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthError, User } from '@supabase/supabase-js';

import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ACTIONS } from 'src/app/shared/constants/constants';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

export interface OptionsForm {
  id: string;
  label: string;
}
interface UserResponse extends User, AuthError {}

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RouterLink,
  ],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  authForm!: FormGroup;
  signIn = ACTIONS.signIn;

  faRightToBracket = faRightToBracket;

  ACTIONS = ACTIONS;

  @Input() options!: OptionsForm;

  private router = inject(Router);

  constructor(
    private readonly authSvc: SupabaseService,
    private readonly fb: FormBuilder,
    private readonly toastSvc: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    const credentials = this.authForm.value;
    let actionToCall =
      this.options.id === ACTIONS.recovery
        ? this.authSvc.sendPwReset(credentials)
        : this.options.id === ACTIONS.signIn
        ? this.authSvc.signIn(credentials)
        : this.authSvc.signUp(credentials);

    // if (this.options.id === ACTIONS.signIn) {
    //   actionToCall = this.authSvc.signIn(credentials);
    // }

    try {
      const result = (await actionToCall) as UserResponse;
      if (result && result.email) {
        if (this.options.id === ACTIONS.recovery) {
          this.toastSvc.success(
            'Please check your emails for further instructions!',
            'Info',
            {
              timeOut: 2000,
              tapToDismiss: true,
              progressBar: true,
              newestOnTop: true,
              closeButton: true,
              positionClass: 'toast-top-full-width',
            }
          );
        } else {
          if (result.email) {
            this.redirectUser();
          }
        }
      } else {
        this.toastSvc.info(result.message, 'Info', {
          timeOut: 2000,
          tapToDismiss: true,
          progressBar: true,
          newestOnTop: true,
          closeButton: true,
          positionClass: 'toast-top-full-width',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private initForm(): void {
    switch (this.options.id) {
      case ACTIONS.recovery:
        this.authForm = this.fb.group({
          email: ['', Validators.required],
        });
        break;

      case ACTIONS.changePassword:
        this.authForm = this.fb.group({
          newPassword: ['', Validators.required],
          password: ['', Validators.required],
        });
        break;

      case ACTIONS.signIn:
      case ACTIONS.signUp:
        this.authForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
        });
        break;

      default:
        break;
    }
  }

  private redirectUser(): void {
    this.router.navigate(['/profile']);
  }
}
