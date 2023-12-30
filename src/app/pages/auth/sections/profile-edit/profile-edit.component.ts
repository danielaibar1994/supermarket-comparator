import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FormComponent } from '../../components/form/form.component';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

export type SectionProfile = null | 'PROFILE' | 'PRIVACY' | 'HELP';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    SignInComponent,
    FontAwesomeModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent {
  faUserGear = faUserGear;

  session = this.supabase.session ? this.supabase.session.user : undefined;

  profileSectionSelected: SectionProfile = null;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.init();
  }

  changeSection(section: SectionProfile) {
    this.profileSectionSelected = section;
  }

  private init() {
    this.supabase.authChanges((_, session) => (this.session = session?.user));
  }
}
