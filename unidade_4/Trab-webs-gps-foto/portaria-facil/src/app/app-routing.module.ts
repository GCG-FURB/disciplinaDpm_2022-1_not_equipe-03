import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then(m => m.PersonPageModule)
  },
  {
    path: 'visit-form',
    loadChildren: () => import('./visit/visit-form/visit-form.module').then(m => m.VisitFormPageModule)
  },
  {
    path: 'visit',
    loadChildren: () => import('./visit/visit.module').then(m => m.VisitPageModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./lobby/lobby.module').then(m => m.LobbyPageModule)
  },
  {
    path: 'scheduling',
    loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingPageModule)
  },
  {
    path: 'visit-type',
    loadChildren: () => import('./visit-type/visit-type.module').then( m => m.VisitTypePageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
