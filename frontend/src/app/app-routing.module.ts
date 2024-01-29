import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/authServices/auth.guard';
import { LoggedInAuthGuard } from './shared/services/authServices/loggedIn.guard';
import { NotfoundComponent } from './modules/layouts/notfound/notfound.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'main',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   component: NotfoundComponent,
  // },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./modules/auth/login/login.module').then((m) => m.LoginModule),
  //   canActivate: [LoggedInAuthGuard],
  // },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./modules/auth/login/login.module').then((m) => m.LoginModule),
  //   canActivate: [LoggedInAuthGuard],
  // },
  // {
  //   path: 'register',
  //   loadChildren: () =>
  //     import('./modules/auth/sign-up/sign-up.module').then(
  //       (m) => m.SignUpModule
  //     ),
  //   canActivate: [LoggedInAuthGuard],
  // },
  // {
  //   path: '',
  //   component: MainComponent,
  //   canLoad: [AuthGuard],
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () =>
  //         import('./modules/main/home/home.module').then((m) => m.HomeModule),
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
