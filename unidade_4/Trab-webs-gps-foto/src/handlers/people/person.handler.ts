import { API, Payload } from '@libs/handler.decorators';

import { APIEnum } from '@enuns/api.enum';
import { Transactional } from '@enuns/transactional.enum';
import { Auth } from '@enuns/auth.enum';
import { CrudHandler } from '@libs/handler.crud';
import { PersonService } from '@services/person.service';

export class PersonHandler extends CrudHandler {

  @API(`/people`, APIEnum.GET, Transactional.READ_ONLY, Auth.NO_AUTH)
  public async list(_: Payload) {
    return new PersonService().getAll();
  }

  @API(`/people`, APIEnum.POST, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async create(payload: Payload) {
    return new PersonService().create(payload.body);
  }

  @API(`/generate-link`, APIEnum.POST, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async generateLink(_: Payload) {
    return new PersonService().generateLink();
  }

  @API(`/people/:id`, APIEnum.GET, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async getById(payload: Payload) {
    return new PersonService().getById(payload.id);
  }

  @API(`/people/:id`, APIEnum.DELETE, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async deletePerson(payload: Payload) {
    return new PersonService().deletePerson(payload.id);
  }

  @API(`/people/:id`, APIEnum.PUT, Transactional.TRANSACTION, Auth.NO_AUTH)
  public async editPerson(payload: Payload) {
    return new PersonService().editPerson(payload.id, payload.body);
  }
}