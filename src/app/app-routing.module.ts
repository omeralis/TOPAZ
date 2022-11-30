import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./layouts/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'case', loadChildren: () => import('./layouts/Case/Case.module').then(m => m.CaseModule) }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
