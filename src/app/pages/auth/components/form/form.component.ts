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
    name: '',
    surname: '',
    avatar_url: '',
    phone: '',
    username: '',
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

    const { name, phone, avatar_url, surname, username } = this.profile;
    this.updateProfileForm.patchValue({
      name,
      surname,
      phone,
      avatar_url,
      username,
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
      const name = this.updateProfileForm.value.name as string;
      const surname = this.updateProfileForm.value.surname as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;
      const phone = this.updateProfileForm.value.phone as string;

      const { error } = await this.supabase.updateProfile({
        id: user.id,
        name,
        surname,
        avatar_url,
        phone,
        username: this.profile.username,
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
