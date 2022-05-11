import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingPage } from './scheduling.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulingPage
  },
  {
    path: 'scheduling-form',
    loadChildren: () => import('./scheduling-form/scheduling-form.module').then( m => m.SchedulingFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingPageRoutingModule {}
