import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormComponent } from '../../components/form/form.component';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { Router } from '@angular/router';

export type SectionProfile = null | 'PROFILE' | 'PRIVACY' | 'HELP';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    SignInComponent,
    FontAwesomeModule,
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {
  faShieldHalved = faShieldHalved;

  session = this.supabase.session ? this.supabase.session.user : undefined;

  profileSectionSelected: SectionProfile = null;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.init();
  }

  changeSection(section: SectionProfile) {
    this.profileSectionSelected = section;
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  private init() {
    this.supabase.authChanges((_, session) => (this.session = session?.user));
  }
}
