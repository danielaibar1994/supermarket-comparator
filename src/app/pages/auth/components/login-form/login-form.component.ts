import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  authForm!: FormGroup;
  signIn = ACTIONS.signIn;

  faRightToBracket = faRightToBracket;

  @Input() options!: OptionsForm;

  constructor(
    private readonly authSvc: SupabaseService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastSvc: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    const credentials = this.authForm.value;
    let actionToCall =
      this.options.id === ACTIONS.signIn
        ? this.authSvc.signIn(credentials)
        : this.authSvc.signUp(credentials);

    // if (this.options.id === ACTIONS.signIn) {
    //   actionToCall = this.authSvc.signIn(credentials);
    // }

    try {
      const result = (await actionToCall) as UserResponse;
      if (result && result.email) {
        this.redirectUser();
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
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private redirectUser(): void {
    this.router.navigate(['/profile']);
  }
}
