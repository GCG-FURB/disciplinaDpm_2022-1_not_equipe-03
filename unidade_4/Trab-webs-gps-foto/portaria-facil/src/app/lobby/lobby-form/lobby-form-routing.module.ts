import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LobbyModel, LobbyService } from 'src/app/core/entities/lobby/lobby.service';

import { LobbyFormPage } from './lobby-form.page';

@Injectable({ providedIn: 'root' })
export class LobbyResolver implements Resolve<LobbyModel> {
  constructor(private service: LobbyService) {}

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
    component: LobbyFormPage,
    resolve: {
      lobby: LobbyResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LobbyFormPageRoutingModule {}
