import { Component, Input } from '@angular/core';
import {
  Profile,
  SupabaseService,
} from '../../../../shared/services/supabase.service';
import { User } from '@supabase/supabase-js';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { LoaderService } from 'src/app/shared/components/loader/service/loader.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  loading = false;
  profile!: Profile;

  @Input()
  userSession!: User;

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: '',
    full_name: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly loader: LoaderService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loader.setLoading(true);
    await this.getProfile();

    const { username, website, avatar_url, full_name } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      full_name,
      website,
      avatar_url,
    });
    this.loader.setLoading(false);
  }

  async getProfile() {
    try {
      this.loading = true;
      const user = this.userSession;
      const {
        data: profile,
        error,
        status,
      } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const user = this.userSession;

      const username = this.updateProfileForm.value.username as string;
      const website = this.updateProfileForm.value.website as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;
      const full_name = this.updateProfileForm.value.full_name as string;

      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
        website,
        avatar_url,
        full_name,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.supabase.signOut();
    this.router.navigateByUrl('/sign-in', { replaceUrl: true });
  }

  get avatarUrl() {
    return this.updateProfileForm.value.avatar_url as string;
  }

  async updateAvatar(event: string): Promise<void> {
    this.updateProfileForm.patchValue({
      avatar_url: event,
    });
    await this.updateProfile();
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
