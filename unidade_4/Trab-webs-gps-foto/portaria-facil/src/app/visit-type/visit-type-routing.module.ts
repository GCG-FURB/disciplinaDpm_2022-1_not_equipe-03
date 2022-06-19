import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitTypePage } from './visit-type.page';

const routes: Routes = [
  {
    path: '',
    component: VisitTypePage
  },
  {
    path: 'visit-type-form',
    loadChildren: () => import('./visit-type-form/visit-type-form.module').then( m => m.VisitTypeFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitTypePageRoutingModule {}
