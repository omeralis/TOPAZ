import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/helpers/guard/auth.guard';
import { LoggedInAuthGuard } from './shared/helpers/guard/LoggedInAuthGuard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./layouts/authentication/authentication.module').then(m => m.AuthenticationModule), canActivate: [LoggedInAuthGuard] },
  { path: 'case', loadChildren: () => import('./layouts/case/case.module').then(m => m.CaseModule), canActivate: [AuthGuard] }
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
