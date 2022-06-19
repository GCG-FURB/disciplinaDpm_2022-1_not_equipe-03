import { API, Payload } from '@libs/handler.decorators';

import { APIEnum } from '@enuns/api.enum';
import { Transactional } from '@enuns/transactional.enum';
import { Auth } from '@enuns/auth.enum';
import { CrudHandler } from '@libs/handler.crud';
import { SchedulingService } from '@services/scheduling.service';

export class SchedulingHandler extends CrudHandler {

  @API(`/scheduling`, APIEnum.GET, Transactional.READ_ONLY, Auth.NO_AUTH)
  public async list(_: Payload) {
    return new SchedulingService().getAll();
  }

  @API(`/scheduling`, APIEnum.POST, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async create(payload: Payload) {
    return new SchedulingService().create(payload.body);
  }

  @API(`/scheduling/:id`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getById(payload: Payload) {
    return new SchedulingService().getById(payload.id);
  }

  @API(`/total-scheduling`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getSchedulingTotal(_: Payload) {
    return ( await new SchedulingService().getSchedulingTotal())[0][0];
  }

  @API(`/total-day-scheduling`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getSchedulingTotalDay(_: Payload) {
    return ( await new SchedulingService().getSchedulingTotalDay())[0][0];
  }

  @API(`/total-week-scheduling`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getSchedulingTotalWeek(_: Payload) {
    return ( await new SchedulingService().getSchedulingTotalWeek())[0][0];
  }

  @API(`/total-last-month-scheduling`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getSchedulingTotalLastMonth(_: Payload) {
    return ( await new SchedulingService().getSchedulingTotalLastMonth())[0][0];
  }

  @API(`/total-today-scheduling`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getSchedulingTotalToday(_: Payload) {
    return ( await new SchedulingService().getSchedulingTotalToday());
  }

  @API(`/scheduling/:id`, APIEnum.DELETE, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async deleteScheduling(payload: Payload) {
    return new SchedulingService().deleteScheduling(payload.id);
  }

  @API(`/scheduling/:id`, APIEnum.PUT, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async editScheduling(payload: Payload) {
    return new SchedulingService().editScheduling(payload.id, payload.body);
  }
}