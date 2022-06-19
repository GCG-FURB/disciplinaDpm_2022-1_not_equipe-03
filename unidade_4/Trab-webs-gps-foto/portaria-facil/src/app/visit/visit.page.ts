import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { SchedulingModel, SchedulingService } from '../core/entities/scheduling/scheduling.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  public total = [] as any;
  public day = [] as any;
  public week = [] as any;
  public lastMonth = [] as any;
  public today: SchedulingModel[];

  constructor(
    private schedulingService: SchedulingService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.init();
  }

  public async init() {
    const loading = await this.loadingController.create({ message: 'Aguarde...' });
    await loading.present();
    this.schedulingService.total().pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(total => {
      this.total = total;
    });
    this.schedulingService.totalDay().pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(total => {
      this.day = total;
    });
    this.schedulingService.totalWeek().pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(total => {
      this.week = total;
    });
    this.schedulingService.totalLastMonth().pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(total => {
      this.lastMonth = total;
    });
    this.schedulingService.totalToday().pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(total => {
      this.today = total;
    });
  }
}