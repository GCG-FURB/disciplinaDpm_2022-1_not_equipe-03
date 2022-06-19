import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStorageService } from './core/app-storage/app-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public login = false;
  public appPages = [
    { title: 'Relatórios', url: '/visit', icon: 'archive' },
    { title: 'Tipo de visita', url: '/visit-type', icon: 'person' },
    { title: 'Pessoas', url: '/person', icon: 'people' },
    { title: 'Agendamento', url: '/scheduling', icon: 'calendar' },
    { title: 'Portaria', url: '/lobby', icon: 'location' },
    { title: 'Usuários', url: '/user/user-list', icon: 'people' },
  ];
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private appStorageService: AppStorageService,
  ) { }

  ngOnInit() {
  }

  public hasToken() {
    if (this.appStorageService.getToken()) {
      return true;
    }
  }
}
