import { Person, PersonFactory } from "@models/person.model";

export class PersonService {

  public async create(person: Person) {
    await PersonFactory().create(person);
  }

  public async getAll() {
    return PersonFactory().findAll();
  }

  public async getById(id: string) {
    return PersonFactory().findByPk(id);
  }

  public async deletePerson(id: string) {
    return PersonFactory().destroy({
      where: {
        id: id
      }
    });
  }

  public async editPerson(id: string, person: Person) {
    const personFinded = await this.getById(id); 
    Object.keys((personFinded as any).dataValues).forEach(key => {
      if (!person[key]) {
        person[key] = personFinded[key];
      }
    });
    delete person.id;
    
    await PersonFactory().update(person, {
      where: {
        id: id
      }
    });
    return person;
  }
} 