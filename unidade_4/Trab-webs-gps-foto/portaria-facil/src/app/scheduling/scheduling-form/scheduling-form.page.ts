import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

import { LobbyService } from 'src/app/core/entities/lobby/lobby.service';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { SchedulingService } from 'src/app/core/entities/scheduling/scheduling.service';
import { VisitTypeService } from 'src/app/core/entities/visitType/visit-type.service';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.page.html',
  styleUrls: ['./scheduling-form.page.scss'],
})
export class SchedulingFormPage implements OnInit {

  public form: FormGroup;
  public date: Date;
  public hours: Date;

  public visityType = [];
  public lobby = [];
  public visited = [];
  public visit = [];

  constructor(
    private schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private visitTypeService: VisitTypeService,
    private lobbyService: LobbyService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      visitReason: [null, Validators.required],
      visitType: [null, Validators.required],
      startDate: [null, Validators.required],
      startHour: [null, Validators.required],
      endDate: [null, Validators.required],
      endHour: [null, Validators.required],
      lobby: [null, Validators.required],
      visited: [null, Validators.required],
      visit: [null, Validators.required]
    });
  }

  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.data.scheduling) {
      this.form.patchValue(this.activatedRoute.snapshot.data.scheduling);
      this.form.get('startHour').patchValue(moment(this.activatedRoute.snapshot.data.scheduling.startDate).toDate());
      this.form.get('endHour').patchValue(moment(this.activatedRoute.snapshot.data.scheduling.endDate).toDate());
      this.form.get('startDate').patchValue(moment(this.activatedRoute.snapshot.data.scheduling.startDate).toDate());
      this.form.get('endDate').patchValue(moment(this.activatedRoute.snapshot.data.scheduling.endDate).toDate());
    }
  }

  public onSearchVisitType(event) {
    this.visitTypeService.list().subscribe(itens => {
      this.visityType = itens;
    });
  }

  public onSearchLobby(event) {
    this.lobbyService.list().subscribe(itens => {
      this.lobby = itens;
    });
  }

  public onSearchVisited(event) {
    this.personService.list().subscribe(itens => {
      this.visited = itens;
    });
  }

  public onSearchVisit(event) {
    this.personService.list().subscribe(itens => {
      this.visit = itens;
    });
  }

  public isNew() {
    return !this.form.get('id').value;
  }

  public async salvar() {
    if (!this.form.valid) {
      const toast = await this.toastController.create({
        message: 'Preencha os campos obrigatórios',
        position: 'top',
        color: 'danger',
        duration: 3000,
        buttons: [{
          text: 'Ok',
          role: 'cancel',
        }]
      });
      toast.present();
      return this.form.markAllAsTouched();
    }
    const loading = await this.loadingController.create({ message: 'Aguarde...' });
    await loading.present();
    try {
      const value = this.form.getRawValue();
      value.visitType = value.visitType.id;
      value.visit = value.visit.id;
      value.lobby = value.lobby.id;
      value.visited = value.visited.id;
      const startDate = moment(value.startDate);
      const startHour = moment(value.startHour);
      startDate.hours(startHour.hours());
      startDate.minutes(startHour.minutes());
      startDate.seconds(startHour.seconds());
      value.startDate = startDate.toDate();
      const endDate = moment(value.endDate);
      const endHour = moment(value.endHour);
      endDate.hours(endHour.hours());
      endDate.minutes(endHour.minutes());
      endDate.seconds(endHour.seconds());
      value.endDate = endDate.toDate();
      if (this.isNew()) {
        await this.schedulingService.insert(value).toPromise();
      } else {
        await this.schedulingService.update(value.id, value).toPromise();
      }
      this.back();
    } catch (err) {

    }
    loading.dismiss();
  }

  public back() {
    this.navController.back();
  }
}
