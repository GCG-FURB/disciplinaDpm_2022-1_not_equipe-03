import { API, Payload } from '@libs/handler.decorators';

import { APIEnum } from '@enuns/api.enum';
import { Transactional } from '@enuns/transactional.enum';
import { Auth } from '@enuns/auth.enum';
import { CrudHandler } from '@libs/handler.crud';
import { LobbyService } from '@services/lobby.service';

export class LobbyHandler extends CrudHandler {

  @API(`/lobby`, APIEnum.GET, Transactional.READ_ONLY, Auth.NO_AUTH)
  public async list(_: Payload) {
    return new LobbyService().getAll();
  }

  @API(`/lobby`, APIEnum.POST, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async create(payload: Payload) {
    return new LobbyService().create(payload.body);
  }

  @API(`/lobby/:id`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getById(payload: Payload) {
    return new LobbyService().getById(payload.id);
  }

  @API(`/lobby/:id`, APIEnum.DELETE, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async deleteLobby(payload: Payload) {
    return new LobbyService().deleteLobby(payload.id);
  }

  @API(`/lobby/:id`, APIEnum.PUT, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async editLobby(payload: Payload) {
    return new LobbyService().editLobby(payload.id, payload.body);
  }
}