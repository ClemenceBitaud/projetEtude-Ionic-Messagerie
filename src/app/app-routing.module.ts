import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/user/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-auth',
    loadChildren: () => import('./pages/user-auth/user-auth.module').then( m => m.UserAuthPageModule)
  },
  {
    path: '',
    redirectTo: 'user-auth',
    pathMatch: 'full'
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'user-profil',
    loadChildren: () => import('./pages/user-profil/user-profil.module').then( m => m.UserProfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-conversation',
    loadChildren: () => import('./pages/user-conversation/user-conversation.module').then( m => m.UserConversationPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
