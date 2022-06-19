import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SchedulingModel, SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';

import { SchedulingFormPage } from './scheduling-form.page';

@Injectable({ providedIn: 'root' })
export class SchedulingResolver implements Resolve<SchedulingModel> {
  constructor(private service: SchedulingService) {}

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
    component: SchedulingFormPage,
    resolve: {
      scheduling: SchedulingResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingFormPageRoutingModule {}
