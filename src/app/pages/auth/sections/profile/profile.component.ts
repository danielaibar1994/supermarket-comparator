import { Component, computed, effect, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleInfo,
  faShieldHalved,
  faUser,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';
import { FormComponent } from '../../components/form/form.component';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { Router } from '@angular/router';
import { ShoppingListState } from 'src/app/+state/shopping-list.store';

export type SectionProfile = null | 'PROFILE-EDIT' | 'PRIVACY' | 'HELP';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    SignInComponent,
    FontAwesomeModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  faUser = faUser;
  faCircleInfo = faCircleInfo;
  faShieldHalved = faShieldHalved;
  faUserGear = faUserGear;

  session = this.supabase.session ? this.supabase.session.user : undefined;

  _profile: any | undefined = undefined;
  profile = signal<any | undefined>(undefined);
  private loggingEffect = effect(() => {
    this._profile = this.profile();
  });

  profileSectionSelected: SectionProfile = null;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly router: Router,
    private storeList: ShoppingListState
  ) {}

  ngOnInit() {
    this.init();
  }

  changeSection(section: SectionProfile) {
    this.router.navigate([section?.toLocaleLowerCase()]);
  }

  async signOut() {
    this.storeList.clear();
    await this.supabase.signOut();
    this.router.navigateByUrl('/sign-in', { replaceUrl: true });
  }

  private init() {
    this.supabase.authChanges((_, session) => {
      if (this.session?.id !== session?.user.id || !this._profile) {
        if (this.session) {
          this.getProfile();
        }
      }

      this.session = session?.user;
    });
  }

  private async getProfile() {
    try {
      const user = this.session;

      if (user) {
        const {
          data: profile,
          error,
          status,
        } = await this.supabase.profile(user);

        if (error && status !== 406) {
          throw error;
        }

        if (profile) {
          this.profile.set(profile);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      // this.loading = false;
    }
  }
}
