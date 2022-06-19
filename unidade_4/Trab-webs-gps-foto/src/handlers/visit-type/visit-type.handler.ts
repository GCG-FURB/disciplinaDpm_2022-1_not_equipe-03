import { API, Payload } from '@libs/handler.decorators';

import { APIEnum } from '@enuns/api.enum';
import { Transactional } from '@enuns/transactional.enum';
import { Auth } from '@enuns/auth.enum';
import { CrudHandler } from '@libs/handler.crud';
import { VisitTypeService } from '@services/visit-type.service';

export class VisitTypeHandler extends CrudHandler {

  @API(`/visit-type`, APIEnum.GET, Transactional.READ_ONLY, Auth.NO_AUTH)
  public async list(_: Payload) {
    return new VisitTypeService().getAll();
  }

  @API(`/visit-type`, APIEnum.POST, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async create(payload: Payload) {
    return new VisitTypeService().create(payload.body);
  }

  @API(`/visit-type/:id`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getById(payload: Payload) {
    return new VisitTypeService().getById(payload.id);
  }

  @API(`/visit-type/:id`, APIEnum.DELETE, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async deleteVisitType(payload: Payload) {
    return new VisitTypeService().deleteVisitType(payload.id);
  }

  @API(`/visit-type/:id`, APIEnum.PUT, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async editVisitType(payload: Payload) {
    return new VisitTypeService().editVisitType(payload.id, payload.body);
  }
}