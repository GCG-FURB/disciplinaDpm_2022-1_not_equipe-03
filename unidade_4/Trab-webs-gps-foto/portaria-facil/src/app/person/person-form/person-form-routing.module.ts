import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PersonModel, PersonService } from 'src/app/core/entities/person/person.service';

import { PersonFormPage } from './person-form.page';

@Injectable({ providedIn: 'root' })
export class PersonResolver implements Resolve<PersonModel> {
  constructor(private service: PersonService) {}

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
    component: PersonFormPage,
    resolve: {
      person: PersonResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonFormPageRoutingModule {}
