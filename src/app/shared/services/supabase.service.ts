import { inject, Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthError,
  AuthSession,
  Session,
  SignUpWithPasswordCredentials,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import {
  BehaviorSubject,
  concat,
  from,
  map,
  Observable,
  shareReplay,
} from 'rxjs';
import { Router } from '@angular/router';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
  full_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  // private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  private currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject(
    null as any
  );

  private readonly supabase = inject(SupabaseClient);
  private readonly router = inject(Router);

  // we need user$ as an Observable for the auth guard to work
  readonly user$: Observable<User | undefined> = concat(
    from(this.supabase.auth.getSession()).pipe(
      map((session) => session.data.session?.user)
    ),
    new Observable<User | undefined>((subscriber) => ({
      unsubscribe: this.supabase.auth.onAuthStateChange((event, session) =>
        subscriber.next(session?.user)
      ).data.subscription.unsubscribe,
    }))
  ).pipe(shareReplay(1));

  constructor() {
    // this.supabase = createClient(
    //   environment.supabase.url,
    //   environment.supabase.key
    // );
  }

  init() {
    this.supabase.auth.onAuthStateChange((event, sess) => {
      console.log('SUPABAS AUTH CHANGED: ', event);
      console.log('SUPABAS AUTH CHANGED sess: ', sess);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER');

        if (sess?.user) {
          this.currentUser.next(sess.user);
        }
      } else {
        this.currentUser.next(undefined);
      }
    });

    this.loadUser();
  }

  async loadUser() {
    if (this.currentUser.value) {
      console.log('ALREADY GOT USER');
      return;
    }
    const user = await this.supabase.auth.getUser();
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 33 ~ AuthService ~ loadUser ~ session',
      user
    );

    if (user.data.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(undefined);
    }
  }

  fetchShoppingList() {
    return this.supabase
      .from('shopping-list')
      .select('*')
      .order('id', { ascending: false });
  }

  createShoppingList() {
    return this.supabase.from('shopping-list').insert({ products: [] });
  }

  addShoppingList(listId: string, newList: any[]) {
    return this.supabase
      .from('shopping-list')
      .update({ products: [...newList] })
      .eq('id', listId);
  }

  removeShoppingList(listId: string, newList: any[]) {
    return this.supabase
      .from('shopping-list')
      .update({ products: [...newList] })
      .eq('id', listId);
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url, full_name`)
      .eq('id', user.id)
      .single();
  }

  async signIn(credentials: SignUpWithPasswordCredentials) {
    try {
      const { data, error, ...rest } =
        await this.supabase.auth.signInWithPassword(credentials);

      return error ? error : data.user;
    } catch (error) {
      console.log(error);
      return error as AuthError;
    }
  }

  async signUp(credentials: SignUpWithPasswordCredentials) {
    try {
      const { data, error, ...rest } = await this.supabase.auth.signUp(
        credentials
      );

      return error ? error : data.user;
    } catch (error) {
      console.log(error);
      return error as AuthError;
    }
  }

  sendPwReset(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  getCurrentUser(): Observable<User | undefined> {
    return this.currentUser.asObservable();
  }

  async setSession(access_token: any, refresh_token: any) {
    return this.supabase.auth.setSession({ access_token, refresh_token });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  // Unused Features

  // getCurrentSession(): Observable<any | boolean | null> {
  //   return this.currentSession.asObservable();
  // }

  // getCurrentUserId(): string | null {
  //   if (this.currentUser.value) {
  //     return (this.currentUser.value as User).id;
  //   } else {
  //     return null;
  //   }
  // }

  // get session() {
  //   this.supabase.auth.getSession().then(({ data }) => {
  //     this._session = data.session;
  //   });
  //   return this._session;
  // }
}
