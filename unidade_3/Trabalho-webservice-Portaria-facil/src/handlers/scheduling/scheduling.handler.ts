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

  @API(`/scheduling/:id`, APIEnum.DELETE, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async deleteScheduling(payload: Payload) {
    return new SchedulingService().deleteScheduling(payload.id);
  }

  @API(`/scheduling/:id`, APIEnum.PUT, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async editScheduling(payload: Payload) {
    return new SchedulingService().editScheduling(payload.id, payload.body);
  }
}