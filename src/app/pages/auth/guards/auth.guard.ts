import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { filter, map, take } from 'rxjs';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

type RedirectUrl = string;

type RedirectFn = (user?: User) => true | RedirectUrl;

function createAuthGuardFromRedirectFunction(
  redirectFn: RedirectFn
): CanActivateFn {
  return () => {
    const auth = inject(SupabaseService);
    const router = inject(Router);

    // const data = JSON.stringify(
    //   localStorage.getItem('sb-hzqtommlhvnrcatryfwp-auth-token')
    // );

    // if (data !== 'null') {
    //   return true;
    // }

    return auth.getCurrentUser().pipe(
      filter((val) => val !== null), // Filter out initial Behavior subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(redirectFn),
      map((trueOrRedirect) =>
        trueOrRedirect === true ? true : router.parseUrl(trueOrRedirect)
      )
    );
  };
}

export const redirectUnauthorizedToLoginPage =
  createAuthGuardFromRedirectFunction((user) => !!user || '/sign-in');

export const redirectLoggedInToHomePage = createAuthGuardFromRedirectFunction(
  (user) => (!!user && '/') || true
);
