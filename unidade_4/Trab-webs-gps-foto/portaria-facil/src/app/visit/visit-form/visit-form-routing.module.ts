import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VisitModel, VisitService } from 'src/app/core/entities/visit/visit.service';

import { VisitFormPage } from './visit-form.page';

@Injectable({ providedIn: 'root' })
export class VisitResolver implements Resolve<  VisitModel> {
  constructor(private service: VisitService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ) {
    if (route.paramMap.get('id') !== 'new') {
      return this.service.get(route.paramMap.get('id'));
    }
  }
}

const routes: Routes = [
  {
    path: ':id',
    component: VisitFormPage,
    resolve: {
      visit: VisitResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitFormPageRoutingModule {}
