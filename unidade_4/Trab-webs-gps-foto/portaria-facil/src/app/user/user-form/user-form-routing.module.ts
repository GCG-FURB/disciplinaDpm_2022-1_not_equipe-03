import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserModel, UserService } from 'src/app/core/entities/user/user.service';

import { UserFormPage } from './user-form.page';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserModel> {
  constructor(private service: UserService) {}

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
    component: UserFormPage,
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserFormPageRoutingModule {}
