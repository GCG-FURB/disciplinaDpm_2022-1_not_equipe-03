import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VisitTypeModel, VisitTypeService } from 'src/app/core/entities/visitType/visit-type.service';

import { VisitTypeFormPage } from './visit-type-form.page';

@Injectable({ providedIn: 'root' })
export class VisitTypeResolver implements Resolve<VisitTypeModel> {
  constructor(private service: VisitTypeService) {}

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
    component: VisitTypeFormPage,
    resolve: {
      visitType: VisitTypeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitTypeFormPageRoutingModule {}
