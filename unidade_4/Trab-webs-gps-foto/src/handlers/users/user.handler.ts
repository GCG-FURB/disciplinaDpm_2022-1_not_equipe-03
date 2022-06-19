import { API, Payload } from '@libs/handler.decorators';

import { APIEnum } from '@enuns/api.enum';
import { Transactional } from '@enuns/transactional.enum';
import { Auth } from '@enuns/auth.enum';
import { CrudHandler } from '@libs/handler.crud';
import { UserService } from '@services/user.service';

export class UserHandler extends CrudHandler {

  @API(`/users`, APIEnum.GET, Transactional.READ_ONLY, Auth.NO_AUTH)
  public async list(_: Payload) {
    return new UserService().getAll();
  }

  @API(`/login`, APIEnum.POST, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async login(payload: Payload) {
    return new UserService().login(payload.body);
  }

  @API(`/users`, APIEnum.POST, Transactional.TRANSACTION, Auth.REQUIRED)
  public async create(payload: Payload) {
    return new UserService().create(payload.body);
  }

  @API(`/users/:id`, APIEnum.GET, Transactional.TRANSACTION, Auth.REQUIRED)
  public async getById(payload: Payload) {
    return new UserService().getById(payload.id);
  }

  @API(`/users/:id`, APIEnum.DELETE, Transactional.TRANSACTION, Auth.REQUIRED)
  public async deleteUser(payload: Payload) {
    return new UserService().deleteUser(payload.id);
  }

  @API(`/users/:id`, APIEnum.PUT, Transactional.TRANSACTION, Auth.REQUIRED)
  public async editUser(payload: Payload) {
    return new UserService().editUser(payload.id, payload.body);
  }

}