import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Agendamento', url: '/scheduling', icon: 'heart' },    
    { title: 'Portaria', url: '/lobby', icon: 'archive' },
    { title: 'Tipo de visita', url: '/visit-type', icon: 'paper-plane' },
    { title: 'Pessoas', url: '/person', icon: 'person' },
    { title: 'Relatórios', url: '/visit', icon: 'trash' },
    { title: 'Usuários', url: '/user/user-list', icon: 'people' },
  ];
  constructor() {}
}
